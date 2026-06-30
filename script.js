const tweetText = document.getElementById("tweetText").innerText;

const tweetUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);

document.getElementById("shareX").href = tweetUrl;
