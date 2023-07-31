import dataclasses
import random
from datetime import datetime, timedelta
from pprint import pprint

import numpy as np
from data import comments, hobbies
from faker import Faker

language_locale_mapping = {
    "Arabic": "ar_AA",
    "Chinese": "zh_CN",
    "Danish": "da_DK",
    "Dutch": "nl_NL",
    "English": "en_US",
    "French": "fr_FR",
    "German": "de_DE",
    "Hebrew": "he_IL",
    "Hindi": "hi_IN",
    "Italian": "it_IT",
    "Japanese": "ja_JP",
    "Korean": "ko_KR",
    "Norwegian": "no_NO",
    "Polish": "pl_PL",
    "Portuguese": "pt_PT",
    "Russian": "ru_RU",
    "Swedish": "sv_SE",
    "Thai": "th_TH",
    "Turkish": "tr_TR",
    "Spanish": "es_ES",
}
locales = list(language_locale_mapping.values())

faker_langs = Faker(locales)
faker_no_langs = Faker()


def generate_random_name():
    choice = np.random.choice(
        ["name", "first_name", "last_name", "1_word", "2_words", "3_words", "4_words"],
        p=[0.5, 0.15, 0.15, 0.1, 0.05, 0.025, 0.025],
    )
    if choice == "name":
        name = faker_langs.name()
    elif choice == "first_name":
        name = faker_langs.first_name()
    elif choice == "last_name":
        name = faker_langs.last_name()
    else:
        word_count = int(choice.split("_")[0])
        words = faker_langs.words(nb=word_count)
        # Capitalize the first letter of each word
        name = " ".join(word.capitalize() for word in words)
    return name


def generate_random_date():
    max_age = int(
        np.random.choice([30, 50, 100])
    )  # 0-30 - 33% * (1 + 0.6 + 0.3), 31-50 - 33% * (0.4 + 0.2) 51-100 - 33% * (0.5)

    end_date = datetime.now()
    start_date = end_date - timedelta(days=365 * max_age)

    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days

    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + timedelta(days=random_number_of_days)
    random_date_str = random_date.strftime("%Y-%m-%d")
    return random_date_str


def generate_random_boolean(true_prob):
    return np.random.choice([True, False], p=[true_prob, 1 - true_prob])


def generate_wishes_list():
    wishes = [
        "Health",
        "Wealth",
        "Happiness",
        "Success",
        "Love",
        "Adventure",
        "Wisdom",
        "Peace",
        "Creativity",
        "Growth",
        "Friendship",
        "Courage",
        "Opportunities",
        "Balance",
        "Longevity",
    ]
    choice = np.random.choice(["empty", "1-5_wishes", "6-10_wishes"], p=[0.2, 0.6, 0.2])
    if choice == "empty":
        wishes_list = []
    elif choice == "1-5_wishes":
        wishes_list = random.sample(wishes, np.random.randint(1, 6))
    else:  # '6-10_wishes'
        wishes_list = random.sample(wishes, np.random.randint(6, 11))
    return wishes_list


def generate_random_language():
    return np.random.choice(list(language_locale_mapping.keys()))


def generate_random_gender():
    return np.random.choice(
        [None, "male", "female", "non-binary", "prefer not to say"],
        p=[0.5, 0.2, 0.2, 0.05, 0.05],
    )


def generate_random_relationship():
    options = [
        None,
        "child",
        "parent",
        "partner",
        "spouse",
        "sibling",
        "grandparent",
        "cousin",
        "friend",
        "colleague",
        "mentor",
        "boss",
        "acquaintance",
    ]
    probabilities = [0.5] + [0.5 / (len(options) - 1)] * (len(options) - 1)
    return np.random.choice(options, p=probabilities)


def generate_random_profession():
    return faker_no_langs.job() if np.random.choice([True, False]) else None


def generate_random_hobby():
    return np.random.choice(hobbies) if np.random.choice([True, False]) else None


def generate_random_use_emojis():
    return np.random.choice(
        [None, "no", "few", "more", "lots of"],
        p=[0.5, 0.1, 0.2, 0.1, 0.1],
    )


def generate_random_greeting_length():
    return np.random.choice(
        [None, "short (<50 words)", "medium (~100 words)", "long (>150 words)"],
        p=[0.5, 0.15, 0.2, 0.15],
    )


def generate_random_style():
    options = [
        "informal",
        "formal",
        "funny",
        "inspirational",
        "romantic",
        "energetic",
        "calm",
        "sarcastic",
        "poetic",
        "philosophical",
        "spiritual",
        "minimalistic",
    ]
    return np.random.choice(options) if np.random.choice([True, False]) else None


def generate_random_theme():
    options = [
        "Anime",
        "Cyberpunk",
        "Fairy Tale",
        "Fantasy",
        "Futuristic",
        "Gothic",
        "Horror",
        "Medieval",
        "Mermaid",
        "Nature",
        "Pirate",
        "Princess",
        "Retro",
        "Samurai",
        "Sci-Fi",
        "Space",
        "Sport",
        "Steampunk",
        "Travel",
        "Unicorn",
        "Victorian",
        "Viking",
        "Western",
    ]
    return np.random.choice(options) if np.random.choice([True, False]) else None


def generate_random_comment():
    return np.random.choice(comments) if np.random.choice([True, False]) else None


@dataclasses.dataclass
class PromptParams:
    name: str
    # date
    date_of_birth: str
    use_age: bool
    use_zodiac_sign: bool
    # content
    what_to_wish: list
    target_language: str
    # personal info
    gender: str
    relationship: str
    profession: str
    hobby: str
    # style
    use_emojis: int
    greeting_length: str
    greeting_style: str
    theme: str
    use_quotation: bool
    use_affirmation: bool
    comment: str

    @property
    def age(self):
        if not self.date_of_birth:
            return None
        dob = datetime.strptime(self.date_of_birth, "%Y-%m-%d")
        now = datetime.now()
        was_birthday_this_year = (now.month, now.day) >= (dob.month, dob.day)
        return now.year - dob.year - int(not was_birthday_this_year)

    _ZODIAC_SIGNS = [
        (("Capricorn", "♑"), (1, 19)),
        (("Aquarius", "♒"), (2, 18)),
        (("Pisces", "♓"), (3, 20)),
        (("Aries", "♈"), (4, 19)),
        (("Taurus", "♉"), (5, 20)),
        (("Gemini", "♊"), (6, 20)),
        (("Cancer", "♋"), (7, 22)),
        (("Leo", "♌"), (8, 22)),
        (("Virgo", "♍"), (9, 22)),
        (("Libra", "♎"), (10, 22)),
        (("Scorpio", "♏"), (11, 21)),
        (("Sagittarius", "♐"), (12, 21)),
        (("Capricorn", "♑"), (12, 31)),  # to handle the case of dates after Dec 21
    ]

    @property
    def zodiac_sign(self):
        if not self.date_of_birth:
            return None
        dob = datetime.strptime(self.date_of_birth, "%Y-%m-%d")
        month, day = dob.month, dob.day
        for sign, (m, d) in self._ZODIAC_SIGNS:
            if (month, day) <= (m, d):
                return f"{sign[0]} ({sign[1]})"
        raise ValueError("Date is invalid. That's weird. Shouldn't get here")


def get_random_params_item():
    return PromptParams(
        name=generate_random_name(),
        # date
        date_of_birth=generate_random_date(),
        use_age=generate_random_boolean(0.5),
        use_zodiac_sign=generate_random_boolean(0.5),
        # content
        what_to_wish=generate_wishes_list(),
        target_language=generate_random_language(),
        # personal details
        gender=generate_random_gender(),
        relationship=generate_random_relationship(),
        profession=generate_random_profession(),
        hobby=generate_random_hobby(),
        # style
        use_emojis=generate_random_use_emojis(),
        greeting_length=generate_random_greeting_length(),
        greeting_style=generate_random_style(),
        theme=generate_random_theme(),
        use_quotation=generate_random_boolean(0.33),
        use_affirmation=generate_random_boolean(0.33),
        comment=generate_random_comment(),
    )


def generate_prompt(p: PromptParams):
    prompt = f"I want to congratulate {p.name} on their birthday. Please create a birthday greeting.\n"

    if p.date_of_birth:
        prompt += f"{p.name} was born on {p.date_of_birth}.\n"

        if p.use_age:
            prompt += f"Their age is {p.age}.\n"
        else:
            prompt += f"Please do not mention {p.name}'s age in the greeting.\n"

        if p.use_zodiac_sign:
            prompt += f"Their zodiac sign is {p.zodiac_sign}.\n"
        else:
            prompt += f"Please do not mention {p.name}'s zodiac sign in the greeting.\n"
        prompt += "\n"

    if p.gender:
        prompt += f"{p.name} identifies as {p.gender}.\n"

    if p.relationship:
        prompt += f"I am {p.name}'s {p.relationship}.\n"

    if p.profession:
        prompt += f"{p.name} is a {p.profession}.\n"

    if p.hobby:
        prompt += f"{p.name} enjoys {p.hobby}.\n"

    prompt += "\n"

    if p.what_to_wish and len(p.what_to_wish) > 0:
        prompt += "Please include the following wishes in the greeting: "
        prompt += ", ".join([f'"{wish}"' for wish in p.what_to_wish])
        prompt += "\n"

    prompt += f"The birthday greeting should be in {p.target_language} language.\n"
    prompt += "\n"

    if p.use_emojis:
        prompt += f"Please include {p.use_emojis} emojis in the greeting.\n"

    if p.greeting_length:
        prompt += f"The greeting should be {p.greeting_length}.\n"

    if p.greeting_style:
        prompt += f"Please use a {p.greeting_style} style for the greeting.\n"

    if p.theme:
        prompt += f"Please incorporate a {p.theme} theme into the greeting.\n"

    if p.use_quotation:
        prompt += "Please include a relevant famous quotation in the greeting.\n"

    if p.use_affirmation:
        prompt += "Please include a motivating affirmation in the greeting.\n"

    prompt += "\n"

    if p.comment:
        prompt += f"Additional context: {p.comment}\n"

    prompt = prompt.replace("\n\n\n", "\n\n").strip()
    return prompt


def get_random_prompt():
    params = get_random_params_item()
    return generate_prompt(params)


if __name__ == "__main__":
    for i in range(100):
        print(generate_random_date())
    exit(0)

    params = get_random_params_item()
    pprint(params)
    print()
    prompt = generate_prompt(params)
    print(prompt)
