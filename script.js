const API_URL = "https://share-counter.macob39.workers.dev";

const tweetTextElement = document.getElementById("tweetText");
const shareButton = document.getElementById("shareX");
const floatingShareButton = document.getElementById("floatingShare");
const copyButton = document.getElementById("copyTweet");
const shareCount = document.getElementById("shareCount");
const countryList = document.getElementById("countryList");

const tweetText = tweetTextElement.innerText.trim();

const tweetUrl =
  "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);

shareButton.href = tweetUrl;
floatingShareButton.href = tweetUrl;

loadStats();

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(tweetText);
    copyButton.innerText = "Tweet copiado";
  } catch (error) {
    alert("No se pudo copiar el tweet. Por favor copia el texto manualmente.");
  }
});

shareButton.addEventListener("click", registerClick);
floatingShareButton.addEventListener("click", registerClick);

async function registerClick() {
  try {
    const response = await fetch(`${API_URL}/click`, {
      method: "POST"
    });

    const data = await response.json();

    shareCount.innerText = data.total.toLocaleString("en-US");

    loadStats();
  } catch (error) {
    console.error("Counter error:", error);
  }
}

async function loadStats() {
  try {
    const response = await fetch(`${API_URL}/stats`);
    const data = await response.json();

    shareCount.innerText = data.total.toLocaleString("en-US");
    renderCountries(data.countries);
  } catch (error) {
    console.error("Stats error:", error);
    countryList.innerHTML = "<span>No se pudo cargar países</span>";
  }
}

function renderCountries(countries) {
  countryList.innerHTML = "";

  if (!countries || countries.length === 0) {
    countryList.innerHTML = "<span>Aún no hay países registrados</span>";
    return;
  }

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
