const pg = require("pg");
const knex = require("knex");
const _ = require("lodash");
const moment = require("moment");

pg.defaults.ssl = false; // !(process.env.NODE_ENV !== 'production');
pg.types.setTypeParser(20, "text", parseInt);
pg.types.setTypeParser(1700, "text", parseFloat);

const getKnexClient = (postgres, connOpts = {}) => {
  return knex({
    client: "pg",
    connection: Object.assign({}, postgres, connOpts),
    pool: { min: 0, max: 10 },
  });
};

const insertHelper = async (_db, table, data, _trx) => {
  const now = moment.utc().format("YYYY-MM-DDTHH:mm:ss");
  const doc = Object.assign({}, data, {
    version: 0,
    createdAt: now,
  });

  const builder = _db(table)
    .insert(doc)
    .returning("*");

  if (_trx) builder.transacting(_trx);
  const result = await builder;

  return _.omitBy(result[0], _.isNil);
};

const updateHelper = async (_db, table, doc, data, _trx) => {
  const now = moment.utc().format("YYYY-MM-DDTHH:mm:ss");

  data.version = doc.version + 1;
  data.updatedAt = now;

  const builder = _db(table)
    .update(_.omitBy(data, _.isNil))
    .where({ id: doc.id, version: doc.version });

  if (_trx) builder.transacting(_trx);
  const affectedRows = await builder;

  if (affectedRows !== 1) throw Error("Version mismatch.");
};

module.exports = {
  getKnexClient,
  insertHelper,
  updateHelper,
};
