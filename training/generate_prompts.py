import random
from datetime import datetime, timedelta
import numpy as np
from faker import Faker
from pprint import pprint

from data import comments, hobbies


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

fake = Faker(locales)


def generate_random_name():
    choice = np.random.choice(
        ['name', 'first_name', 'last_name', '1_word', '2_words', '3_words', '4_words'],
        p=[0.5, 0.15, 0.15, 0.1, 0.05, 0.025, 0.025]
    )
    if choice == 'name':
        name = fake.name()
    elif choice == 'first_name':
        name = fake.first_name()
    elif choice == 'last_name':
        name = fake.last_name()
    else:
        word_count = int(choice.split('_')[0])
        words = fake.words(nb=word_count)
        # Capitalize the first letter of each word
        name = " ".join(word.capitalize() for word in words)
    return name


def generate_random_date():
    end_date = datetime.now()
    start_date = end_date - timedelta(days=365 * 150)

    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days

    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + timedelta(days=random_number_of_days)
    random_date_str = random_date.strftime('%Y-%m-%d')
    return random_date_str


def generate_random_boolean(true_prob):
    return np.random.choice([True, False], p=[true_prob, 1-true_prob])


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


def generate_wishes_list():
    choice = np.random.choice(['empty', '1-5_wishes', '6-10_wishes'], p=[0.2, 0.6, 0.2])
    if choice == 'empty':
        wishes_list = []
    elif choice == '1-5_wishes':
        wishes_list = random.sample(wishes, np.random.randint(1, 6))
    else:  # '6-10_wishes'
        wishes_list = random.sample(wishes, np.random.randint(6, 11))
    return wishes_list


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
    return fake.job() if np.random.choice([True, False]) else None


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


def get_random_params_item():
    return dict(
        name=generate_random_name(),
        # date
        date_of_birth=generate_random_date(),
        use_age=generate_random_boolean(0.5),
        use_zodiac_sign=generate_random_boolean(0.5),
        # content
        what_to_wish=generate_wishes_list(),
        target_language=np.random.choice(list(language_locale_mapping.keys())),
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


params = get_random_params_item()
pprint(params)
