const _ = require("lodash");
const moment = require("moment");
const { getKnexClient } = require("../lib/db-utils");
const { postgres } = require("../config");

let db;

const initDb = () => {
  if (!db) db = getKnexClient(postgres);
};

const getDb = () => {
  if (db) return db;
  db = getKnexClient(postgres);
  return db;
};

const insertHelper = async (_db, table, data, _trx) => {
  const now = moment.utc().format("YYYY-MM-DDTHH:mm:ss");
  const doc = Object.assign({}, data, {
    version: 0,
    createdAt: now,
  });

  const builder = _db(table).insert(doc).returning("*");

  if (_trx) builder.transacting(_trx);
  const result = await builder;

  return _.omitBy(result[0], _.isNil);
};

const updateHelper = async (_db, table, doc, data, _trx) => {
  const now = moment.utc().format("YYYY-MM-DDTHH:mm:ss");

  data.version = doc.version + 1;
  data.updatedAt = now;

  const builder = _db(table).update(_.omitBy(data, _.isNil)).where({ id: doc.id, version: doc.version });

  if (_trx) builder.transacting(_trx);
  const affectedRows = await builder;

  if (affectedRows !== 1) throw Error("Version mismatch.");
};

module.exports = {
  initDb,
  getDb,
  insertHelper,
  updateHelper,
};

