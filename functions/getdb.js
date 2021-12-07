exports.handler = async function (event, context) {
  const { createClient } = require("redis");

  const redis = createClient({ url: process.env.REDIS_URL });

  await redis.connect();

  const items = await redis.get("items");
  const duration = await redis.get("duration");

  return {
    statusCode: 200,
    body: JSON.stringify({
      items: JSON.parse(items),
      duration: duration,
    }),
  };
};
