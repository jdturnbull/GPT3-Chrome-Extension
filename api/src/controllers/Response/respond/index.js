const { load } = require("cheerio");
const axios = require("axios");
const createCompletion = require("../../../helpers/createCompletion");

module.exports = async input => {
  const { question, content } = JSON.parse(input);

  try {
    const answer = await createCompletion({
      prompt: `Given the question: ${question}, and the relevant text below, answer the question in full using the relevant information and your own knowledge.\n\nQuestion: ${question}\n\nRelevant Text: ${content}\n\nResponse:`,
      max_tokens: 1000,
      temperature: 1,
      removeWhitespace: true,
    });

    return answer;
  } catch (error) {
    console.log(error);
    return "Sorry! We're having trouble accessing this page.";
  }
};
