const { Configuration, OpenAIApi } = require("openai");
const Config = require("../../config");
const moderate = require("../moderate");

const configuration = new Configuration({
  apiKey: Config.open_ai.api_key,
});

const openai = new OpenAIApi(configuration);

module.exports = async input => {
  const { prompt, max_tokens, temperature, removeWhiteSpace } = input;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens,
      temperature,
    });

    if (!response.data.choices[0].text || response.data.choices[0].text === " ") {
      return "There was an error generating this sentence. Please try again.";
    }

    const flagged = await moderate(response.data.choices[0].text);

    if (flagged) {
      await Posthog.track(null, "inappropriate_generation", { prompt, response: response.data.choices[0].text });
      return "This generation was flagged as inappropriate. Please try again.";
    }

    if (removeWhiteSpace) {
      return response.data.choices[0].text.trim();
    } else {
      return response.data.choices[0].text;
    }
  } catch (error) {
    console.log(error.message);
  }
};
