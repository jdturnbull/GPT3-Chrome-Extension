module.exports = {
  application: "API",
  environment: process.env.NODE_ENV,
  api_base: process.env.NODE_ENV === "production" ? "https://apiv2.communion.so" : "http://localhost:7074",
  app_base: process.env.NODE_ENV === "production" ? "https://app.communion.so" : "http://localhost:3000",
  port: process.env.PORT,
  app_secret: process.env.APP_SECRET,
  postgres: {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB,
  },
  magic: {
    sk: process.env.MAGIC_SK,
  },
  shopify: {
    api_key: process.env.SHOPIFY_API_KEY,
    api_secret: process.env.SHOPIFY_API_SECRET,
    scopes: process.env.SCOPES,
    host: process.env.HOST,
  },
  open_ai: {
    api_key: process.env.OPENAI_API_KEY,
  },
  stych: {
    project_id: process.env.STYCH_PROJECT_ID,
    secret: process.env.STYCH_SECRET,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET,
    publicKey: process.env.STRIPE_PUBLIC,
    priceId: process.env.STRIPE_PRICE_ID,
  },
  twitter: {
    api_key: process.env.TWITTER_API_KEY,
    api_secret: process.env.TWITTER_API_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
    app_id: process.env.TWITTER_APP_ID,
    client_id: process.env.TWITTER_CLIENT_ID,
    client_secret: process.env.TWITTER_CLIENT_SECRET,
  },
};
