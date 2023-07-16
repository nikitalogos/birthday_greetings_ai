import { reactive, computed } from "vue";

export const params = reactive({
  groups() {
    return [
      { name: "essentials", label: "Essentials", items: [this.name, this.date_of_birth] },
      { name: "dynamic", label: "Dynamic", items: [this.age, this.zodiac] },
      {
        name: "person_details",
        label: "Person details",
        items: [this.gender, this.relationship, this.profession, this.hobby],
      },
      { name: "content", label: "Content", items: [this.what_to_wish, this.target_language] },
      { name: "comment", label: "Comment", items: [this.comment] },
      {
        name: "styling",
        label: "Styling",
        items: [this.use_emojis, this.greeting_length, this.greeting_style, this.theme, this.use_quotation],
      },
    ];
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~essentials~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  name: {
    label: "Name",
    type: "text",
    value: null,
  },
  date_of_birth: {
    label: "Date of Birth",
    type: "date",
    value: null,
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~person details~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  gender: {
    label: "Gender",
    type: "select",
    value: null,
    options: ["male", "female", "non-binary", "prefer not to say"],
  },
  relationship: {
    label: "Relationship",
    type: "select",
    value: null,
    options: [
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
      "your variant",
    ],
  },
  profession: {
    label: "Profession",
    type: "text",
    value: null,
  },
  hobby: {
    label: "Hobby",
    type: "text",
    value: null,
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~content~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  what_to_wish: {
    label: "What to wish",
    type: "multiselect",
    value: [],
    options: ["health", "wealth", "happiness", "success", "love", "adventure"],
  },
  target_language: {
    label: "Target language",
    type: "select",
    value: null,
    options: ["en", "ru"],
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~comment~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  comment: {
    label: "Comment",
    type: "textarea",
    value: null,
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~styling~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  use_emojis: {
    label: "Use emojis",
    type: "select",
    value: null,
    options: ["no", "few", "more", "lots of"],
  },
  greeting_length: {
    label: "Greeting length",
    type: "select",
    value: null,
    options: ["short", "medium", "long", "your variant"],
  },
  greeting_style: {
    label: "Greeting style",
    type: "select",
    value: null,
    options: ["formal", "informal", "funny", "your variant"],
  },
  theme: {
    label: "Theme",
    type: "select",
    value: null,
    options: ["cyberpunk", "your variant"], // todo fill themes
  },

  use_quotation: {
    label: "Use quotation",
    type: "toggle",
    value: null,
  },
  //  use_affirmation: {
  //    label: "Use affirmation",
  //    type: "checkbox",
  //    value: null,
  //  },
});

const age_value = computed(() => {
  const now = new Date();
  const date = params.date_of_birth.value;
  if (!date) return null;

  const was_birthday_this_year =
    now.getMonth() > date.getMonth() || (now.getMonth() === date.getMonth() && now.getDate() >= date.getDate());
  const age = now.getFullYear() - date.getFullYear() - (was_birthday_this_year ? 0 : 1);
  return age;
});
params.age = {
  label: "Age",
  type: "dynamic",
  value: age_value,
  hide: false,
};

const ZODIAC_SIGNS = [
  { sign: ["Capricorn", "♑"], date: [1, 19] },
  { sign: ["Aquarius", "♒"], date: [2, 18] },
  { sign: ["Pisces", "♓"], date: [3, 20] },
  { sign: ["Aries", "♈"], date: [4, 19] },
  { sign: ["Taurus", "♉"], date: [5, 20] },
  { sign: ["Gemini", "♊"], date: [6, 20] },
  { sign: ["Cancer", "♋"], date: [7, 22] },
  { sign: ["Leo", "♌"], date: [8, 22] },
  { sign: ["Virgo", "♍"], date: [9, 22] },
  { sign: ["Libra", "♎"], date: [10, 22] },
  { sign: ["Scorpio", "♏"], date: [11, 21] },
  { sign: ["Sagittarius", "♐"], date: [12, 21] },
  { sign: ["Capricorn", "♑"], date: [12, 31] }, // to handle the case of dates after Dec 21
];
const zodiac_value = computed(() => {
  const date = params.date_of_birth.value;
  if (!date) return null;

  for (let zodiac_sign of ZODIAC_SIGNS) {
    if (
      date.getMonth() + 1 < zodiac_sign.date[0] ||
      (date.getMonth() + 1 === zodiac_sign.date[0] && date.getDate() <= zodiac_sign.date[1])
    ) {
      return `${zodiac_sign.sign[0]} (${zodiac_sign.sign[1]})`;
    }
  }
  throw new Error("Date is invalid. That's weird. Shouldn't get here");
});
params.zodiac = {
  label: "Zodiac sign",
  type: "dynamic",
  value: zodiac_value,
  hide: true,
};
