FROM python:3.11-slim-bullseye

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY python_server python_server
COPY setup.py setup.py
RUN pip3 install .

CMD [ "python3", "-m" , "python_server", "--host=0.0.0.0"]
