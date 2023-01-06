const { getDb } = require("./db");

class Database {
  get db() {
    return getDb();
  }
}

module.exports = new Database();

