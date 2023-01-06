exports.up = async function(knex) {
  await knex.schema.alterTable("users", table => {
    table.dropColumn("capturedWordCount");
  });
};

exports.down = function(knex) {};
