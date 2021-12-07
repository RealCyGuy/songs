exports.handler = async function (event, context) {
  if (event.queryStringParameters.secret !== process.env.SECRET) {
    return {
      statusCode: 403,
      body: "Forbidden",
    };
  }

  const google = require("@googleapis/youtube");
  const { createClient } = require("redis");
  const { parse } = require("tinyduration");

  const client = new google.youtube({
    version: "v3",
    auth: process.env.API_KEY,
  });
  const redis = createClient({ url: process.env.REDIS_URL });

  await redis.connect();
  var rawItems = await redis.get("rawItems");
  rawItems = JSON.parse(rawItems);

  var items = [];
  var duration = 0;
  for (let i3 = 0; i3 < rawItems.length; i3++) {
    const itemGroup = rawItems[i3];
    let ids = itemGroup.map((item) => item.contentDetails.videoId).join(",");
    res = await client.videos.list({
      part: ["contentDetails"],
      maxResults: 50,
      id: ids,
    });
    let i2 = 0;
    for (let i = 0; i < itemGroup.length; i++) {
      if ("videoPublishedAt" in itemGroup[i].contentDetails) {
        d = parse(res.data.items[i2].contentDetails.duration);
        let seconds = 0;
        if ("seconds" in d) {
          seconds = d.seconds;
        } else {
          d.seconds = 0;
        }
        if ("minutes" in d) {
          seconds += d.minutes * 60;
        } else {
          d.minutes = 0;
        }
        items.push({
          id: itemGroup[i].contentDetails.videoId,
          title: itemGroup[i].snippet.title,
          thumbnail: itemGroup[i].snippet.thumbnails.high.url,
          channel: itemGroup[i].snippet.videoOwnerChannelTitle,
          channelId: itemGroup[i].snippet.videoOwnerChannelId,
          duration: d.minutes + ":" + d.seconds.toString().padStart(2, "0"),
        });
        duration += seconds;
        i2++;
      }
    }
  }

  await redis.set("items", JSON.stringify(items));
  await redis.set("last updated", Date.now().toString());
  await redis.set("duration", duration.toString());

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};
