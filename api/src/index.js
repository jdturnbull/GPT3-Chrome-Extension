const { initDb } = require("./data/db");
const createServer = require("./server");
const { port } = require("./config");
const logger = require("./logger");

const setup = async () => {
  initDb();

  const app = createServer();
  app.listen(port, () => logger.info({ port }, "System booted"));
};

setup();
