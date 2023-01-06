exports.up = async function(knex) {
  await knex.schema.createTable("users", table => {
    table.string("id").primary();
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.string("email").notNullable();
    table.string("stripeCustomerId");
    table.string("stripeSubscriptionId");
    table.string("subscriptionStatus").notNullable();
    table.bigint("billing_period_end");
    table.boolean("vip");
    table.integer("wordCount").notNullable();
    table.integer("wordLimit").notNullable();
    table.boolean("verified").notNullable();
    table.bigint("createdAt").notNullable();
    table.bigint("updatedAt");
  });

  await knex.schema.createTable("sessions", table => {
    table.string("id").primary();
    table.string("userId").notNullable();
    table.string("token").notNullable();
    table.boolean("active").notNullable();
    table.bigint("createdAt").notNullable();
    table.bigint("updatedAt");
  });

  await knex.schema.createTable("documents", table => {
    table.string("id").primary();
    table.string("userId").notNullable();
    table.string("type").notNullable();
    table.string("title", 1000);
    table.string("textContent", 100000).notNullable();
    table.json("editorState").notNullable();
    table.boolean("pinned");
    table.boolean("shareable");
    table.boolean("archived");
    table.boolean("deleted");
    table.bigint("createdAt").notNullable();
    table.bigint("updatedAt");
  });
};

exports.down = function(knex) {};
