# Guide for translating the app

If you want to translate the documentation instead, check the [guide for translating the documentation](/readme/readme.md).

## ⛔️ Rules and advices

- **Please do not use Internet translators**

Translations made automatically are not allowed in VueTube. You need to know and understand both English and the language you're translating to guarantee a good result. Please do not contribute using Google Translator or similars.

_Example: "Enable Return Youtube Dislike integration" should be translated to Spanish as "Activar la integración de Return YouTube Dislike", but an automatic translation could be "Activar integración Devolver los No me gusta de Youtube", and that doesn't sound natural._

- **Consider leaving some words in English**

Some words might sound better in English. For example, depending of the grade of English casual words in your language, you can consider not translating "Plugins", "Dislike", etc.

_Example: Instead of translating "Hide Dislikes" to French as "Masquer Je n'aime", you can use "Masquer Dislikes"._

- **The name of the language should be in the target language, not in English**

\*Example: "日本語" instead of "Japanese", "Italiano" instead of "Italian" and "Русский" instead of "Russian".

That doesn't apply to the file name (polish.js, dutch.js, indonesian.js), but it does to _"name: example"_ section.

## 🟢 How to do the translation

There are different fields. This is an example of a field:

`home: "Home"`

Never touch the text previous the double dot (:). That is an indicator of what part is being translated. If you modify it, it won't work.

Only translate the text into quotation marks ("). For example, if the translation of "Home" is "Vue", the result will be:

`home: "Vue"`

It's easy and intuitive. Also there are different sections:

```
settings: {
  general: "General",
  theme: "Theme"
}
```

Don't touch the section name, in this case, "settings".

## 💻 How to edit and pull request

You can’t add a file directly to VueTube repository, but you can do a fork. That means duplicating the project in your personal account. In your fork you can edit whatever you want.

After you have done everything, go to Pull Requests on VueTube repository and make a new one clicking in “Compare across repositories”. Include a description about what have you changed. A VueTube admin will approve your changes and your translation will be implemented.

<p align="center"> Thank you for being interested on contributing! </p>

<br>
<br>

**Note:** We rely on your good faith. As a community project, many of our maintainers are not native speakers of the languages that the community has provided. We will do our best to review your translations, but we are heavily dependent on the community to provide us with quality translations. In cases where disagreements arise between translators, we may be forced to mediate and make a decision regardless of our team's proficiency in the language. As such, we ask that disagreements between translators be solved in a civil manner without the need for moderation.
