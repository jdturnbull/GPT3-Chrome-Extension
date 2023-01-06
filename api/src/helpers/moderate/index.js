const { default: axios } = require("axios");
const Config = require("../../config");

module.exports = async input => {
  try {
    // Add headers to the below axios post
    const response = await axios.post(
      "https://api.openai.com/v1/moderations",
      { input },
      { headers: { "Content-Type": "application/json", Authorization: `Bearer ${Config.open_ai.api_key}` } },
    );

    return response.data.results[0].flagged;
  } catch (error) {
    console.log(error);
  }
};
