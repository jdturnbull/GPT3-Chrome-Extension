const Sentry = require("@sentry/node");
const wordcount = require("wordcount");
const Database = require("../../data/Database");

module.exports = async input => {
  const { response, user } = input;

  try {
    if (response) {
      await Database.db("users")
        .where("id", user.id)
        .update({
          wordCount: user.wordCount + wordcount(response),
        });
    }
  } catch (error) {
    Sentry.captureException(error);
  }
};
