exports.handler = async function (event, context) {
  const google = require("@googleapis/youtube");
  const client = new google.youtube({
    version: "v3",
    auth: process.env.API_KEY,
  });
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
    items.push(...res.data.items);
    nextPageToken = res.data.nextPageToken;
  }
  
  items = items.filter((value) => {
    return "videoPublishedAt" in value.contentDetails;
  });

  return {
    statusCode: 200,
    body: JSON.stringify(items),
    headers: {
      "Cache-Control": "public, s-maxage=7200",
    },
  };
};
