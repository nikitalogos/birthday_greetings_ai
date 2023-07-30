![Copter with a present](docs/copter_leonardo_no_bg.png)

# Birthday Greetings AI

Create outstanding birthday greetings for your loved ones, friends and colleagues! 
Use them right away, or take them as templates to spark your own creativity. 
Welcome to the ~~future~~ present! Your birthday present! 🎁

## How to use

1. Navigate to https://logosnikita.com/birthday_greetings_ai/
2. Obtain a token from [Replicate](https://replicate.com/) and paste it into the corresponding field
   1. You can skip this step and copy prompt for your favourite chatbot
3. Click "Next" to get to "Params" tab
4. Fill in data about a person you want to congratulate.
   1. You can just enter name and that will be enough, but to get more personalized greeting you may want to fill in other fields
   2. Params you enter will result in a prompt for AI model. You can see it below the input form.
5. Press "Create greeting" to generate a greeting with Llama 2.
   1. You will get to "AI Response" tab. Please wait until AI creates a response.
   2. You can copy response to clipboard, regenerate response or export the entire dialogue as .txt or .json
6. On "Params" page you can either copy prompt to clipboard to paste it into a different chatbot.
   1. For example: [ChatGPT](https://chat.openai.com/), [Claude 2](https://chat.claudeai.ai)

## Example results

Although this app uses Llama 2 as a language model, you can achive better results 
in bigger, but yet less accessible :( models.

For example, here's what I've managed to generate in OpenAI's GPT-4:
1. [Samurai Tiger's Birthday 🐯🎂 (verbose)](https://chat.openai.com/share/5f85c7ef-d6db-4cf8-bde3-753f82439688)
2. [Tiger's Samurai Birthday 🐯🎂⚔️ (laconic)](https://chat.openai.com/share/bf914614-0502-4c43-a8f6-88dd41da4713)

## Integrations

Birthday Greetings AI supports passing `name` and `date_of_birth` params in url query:
```
https://logosnikita.com/birthday_greetings_ai/?name=Victor&date_of_birth=1998-04-21
```
1. Spaces (and other special characters) in `name` should be encoded to be a valid URL: 
   - `Victor Frankenstein` → `Victor%20Frankenstein`
2. `date_of_birth` should be in `YYYY-MM-DD` format

### Example integration

My another project, [Birthday Reminder](https://github.com/nikitalogos/birthday_reminder) has integration with `Birthday Greetings AI`.

It creates birthday events in Google Calendar and 
adds a link to this app with pre-computed `name` and `date_of_birth` fields into the event description,
so you can just click it from calendar or from email notification.

## Tech specs

This app uses Python3 [aiohttp](https://pypi.org/project/aiohttp/) server hosted at [fly.io](https://fly.io/) as a backend.

Frontend is built with [Nuxt 3](https://nuxt.com/) framework 
and uses [Vue 3](https://vuejs.org/), [Pug](https://www.npmjs.com/package/pug) and [Sass](https://sass-lang.com/).
It also uses a few packages defined in `package.json` and some parts of [Semantic.ui](https://semantic-ui.com/) UI framework.
It is hosted via [Github Pages](https://pages.github.com/).

## Licences

This app is licenced under [MIT licence](https://github.com/nikitalogos/birthday_greetings_ai/blob/main/LICENCE).

It uses Llama 2 language model developed by Meta, which is licenced under [Llama 2 Community License Agreement](https://ai.meta.com/resources/models-and-libraries/llama-downloads/)

Llama 2 is served by [Replicate.com](https://replicate.com/) under [Replicate Terms of Use](https://replicate.com/terms)

Arts for web page were generated via `Stable Diffusion XL` at [Clipdrop.co](https://clipdrop.co/stable-diffusion)

Cover for this README.md was generated with [Leonardo.Ai](https://leonardo.ai/).

## Support

If you like this project, leave star on GitHub :)

## Related

If you like this project, you may also like my another project - [Birthday Reminder](https://github.com/nikitalogos/birthday_reminder)!

This is a simple app to keep track of all birthdays you don't want to miss out.
