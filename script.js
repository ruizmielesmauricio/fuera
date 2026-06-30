const API_URL = "https://share-counter.macob39.workers.dev";

const tweetText = document.getElementById("tweetText").innerText.trim();

const tweetUrl =
  "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);

document.getElementById("shareX").href = tweetUrl;
document.getElementById("floatingShare").href = tweetUrl;

loadStats();

document.getElementById("copyTweet").addEventListener("click", async () => {
  await navigator.clipboard.writeText(tweetText);
  document.getElementById("copyTweet").innerText = "Tweet copiado";
});

document.getElementById("shareX").addEventListener("click", registerClick);
document.getElementById("floatingShare").addEventListener("click", registerClick);

async function registerClick() {
  try {
    const response = await fetch(`${API_URL}/click`, {
      method: "POST"
    });

    const data = await response.json();

    document.getElementById("shareCount").innerText =
      data.total.toLocaleString("en-US");

    loadStats();
  } catch (error) {
    console.error("Counter error:", error);
  }
}

async function loadStats() {
  try {
    const response = await fetch(`${API_URL}/stats`);
    const data = await response.json();

    document.getElementById("shareCount").innerText =
      data.total.toLocaleString("en-US");

    renderCountries(data.countries);
  } catch (error) {
    console.error("Stats error:", error);
  }
}

function renderCountries(countries) {
  const countryList = document.getElementById("countryList");
  countryList.innerHTML = "";

  countries.forEach(country => {
    const span = document.createElement("span");
    span.innerText = `${countryCodeToFlag(country.code)} ${country.code} · ${country.count}`;
    countryList.appendChild(span);
  });
}

function countryCodeToFlag(code) {
  if (!code || code === "XX") return "🌎";

  return code
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt())
    );
}

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
