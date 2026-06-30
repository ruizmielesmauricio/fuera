const tweetText = document.getElementById("tweetText").innerText.trim();

const tweetUrl =
  "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);

document.getElementById("shareX").href = tweetUrl;
document.getElementById("floatingShare").href = tweetUrl;

document.getElementById("copyTweet").addEventListener("click", async () => {
  await navigator.clipboard.writeText(tweetText);
  document.getElementById("copyTweet").innerText = "Tweet copiado";
});

document.getElementById("shareX").addEventListener("click", updateFakeCounter);
document.getElementById("floatingShare").addEventListener("click", updateFakeCounter);

function updateFakeCounter() {
  const counter = document.getElementById("shareCount");
  const current = Number(counter.innerText.replace(/,/g, ""));
  counter.innerText = (current + 1).toLocaleString("en-US");
}
