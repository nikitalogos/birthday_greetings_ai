import argparse
import asyncio
import json
import os
import socket
import traceback
from typing import List

import aiohttp_cors
import replicate
from aiohttp import web
from cerberus import Validator


class Server:
    def __init__(self, routes_post: dict, host: str, port: int, allowed_client_hosts: List[str]):
        self.routes_post = {k: self._make_async_route(*v) for k, v in routes_post.items()}
        self.host = host
        self.port = int(port)
        self.allowed_client_hosts = allowed_client_hosts

    def _make_async_route(self, func, request_validator):
        def exception_to_json(func):
            def wrapper(*args, **kwargs):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    traceback.print_exc()
                    return {"error": str(e)}

            return wrapper

        async def route(request):
            origin = request.headers.get("Origin")
            if origin not in self.allowed_client_hosts:
                print(f"invalid origin: {origin=}, {request.headers=}")
                return web.json_response({"error": "Invalid client host!"})

            r_json = await request.json()

            if not request_validator.validate(r_json):
                errors_dict = request_validator.errors
                errors_str = json.dumps(errors_dict, indent=4)
                return web.json_response({"error": f"Request json validation error:\n{errors_str}"})

            func_safe = exception_to_json(func)
            loop = asyncio.get_running_loop()
            response = await loop.run_in_executor(None, func_safe, r_json)
            return web.json_response(response)

        return route

    def _create_app(self):
        app = web.Application(
            client_max_size=int(1e8),
        )
        cors = aiohttp_cors.setup(
            app,
            defaults={
                host: aiohttp_cors.ResourceOptions(
                    allow_credentials=True,
                    expose_headers="*",
                    allow_headers="*",
                )
                for host in self.allowed_client_hosts
            },
        )

        for path, handler in self.routes_post.items():
            resource = cors.add(app.router.add_resource(path))
            cors.add(resource.add_route("POST", handler))
        return app

    def serve_forever(self):
        app = self._create_app()
        web.run_app(
            app,
            host=self.host,
            port=self.port,
            access_log=None,  # disable logs
        )


def chatbot(r_json):
    os.environ["REPLICATE_API_TOKEN"] = r_json["token"]

    user_prompt = r_json["prompt"]
    prompt = (
        "You are a helpful assistant. You do not respond as 'User' or pretend to be 'User'. "
        "You only respond once as 'Assistant'.\n\n\n"
        f"User: {user_prompt}\n\n\n"
        "Assistant: "
    )
    print(f"{prompt=}")

    resp = replicate.run(
        "a16z-infra/llama-2-13b-chat:d5da4236b006f967ceb7da037be9cfc3924b20d21fed88e1e94f19d56e2d3111",
        input=dict(
            prompt=prompt,
            temperature=0.5,
            top_p=0.9,
            max_length=1024,
            repetition_penalty=1,
        ),
    )
    # for p in resp:
    #     print(p, end="")
    resp_str = "".join(list(resp))
    return dict(message=resp_str)


def get_ip_in_localnet():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # doesn't even have to be reachable
        s.connect(("10.255.255.255", 1))
        ip = s.getsockname()[0]
    except Exception:
        ip = "127.0.0.1"
    finally:
        s.close()
    return ip


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", type=str, default="0.0.0.0")
    parser.add_argument("--port", type=int, default=8080)
    parser.add_argument("--dev", action="store_true")
    args = parser.parse_args()

    allowed_client_hosts = ["https://logosnikita.com"]
    if args.dev:
        allowed_client_hosts.append("http://localhost:3000")
        allowed_client_hosts.append(f"http://{get_ip_in_localnet()}:3000")

    server = Server(
        routes_post={
            "/api/ping": [
                lambda r_json: r_json,
                Validator({}),
            ],
            "/api/chatbot": [
                chatbot,
                Validator(
                    {
                        "token": {"type": "string", "required": True},
                        "prompt": {"type": "string", "required": True},
                    }
                ),
            ],
        },
        host=args.host,
        port=args.port,
        allowed_client_hosts=allowed_client_hosts,
    )
    server.serve_forever()
