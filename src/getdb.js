let data;

export default async function () {
  if (typeof data == "undefined") {
    data = await fetch("/.netlify/functions/getdb").then((res) => res.json());
    data.items.forEach((item) => {
      item.publishedDate = new Date(item.publishedDate);
      item.addedDate = new Date(item.addedDate);
      item.rawLikes = parseInt(item.likes.replaceAll(",", ""));
      item.rawViews = parseInt(item.views.replaceAll(",", ""));
    });
    console.log(data);
  }
  return data;
}
