exports.up = async function(knex) {
  await knex.schema.alterTable("users", table => {
    table
      .bigint("capturedWordCount")
      .notNullable()
      .defaultTo(0);
    table
      .bigint("nextUsageUpdate")
      .notNullable()
      .defaultTo(0);
  });
};

exports.down = function(knex) {};
