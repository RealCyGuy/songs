exports.handler = async function (event, context) {
  if (event.queryStringParameters.secret !== process.env.SECRET) {
    return {
      statusCode: 403,
      body: "Forbidden",
    };
  }

  const google = require("@googleapis/youtube");
  const { createClient } = require("redis");

  const client = new google.youtube({
    version: "v3",
    auth: process.env.API_KEY,
  });
  const redis = createClient({ url: process.env.REDIS_URL });

  var items = [];
  var nextPageToken = true;
  while (nextPageToken) {
    if (nextPageToken === true) {
      nextPageToken = "";
    }
    res = await client.playlistItems.list({
      part: ["contentDetails,snippet"],
      maxResults: 50,
      playlistId: "PLRct1-5In-8Ewg5Kq-0JP8wh3ZweOXH9A",
      pageToken: nextPageToken,
    });
    items.push(res.data.items);
    nextPageToken = res.data.nextPageToken;
  }

  await redis.connect();
  await redis.set("rawItems", JSON.stringify(items));

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};
