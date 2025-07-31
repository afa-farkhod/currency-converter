let exchangeRate = null;
let apiURL = "https://open.er-api.com/v6/latest/USD";

async function fetchRate() {
    try {
        const res = await fetch(apiURL);
        const data = await res.json();
        if (data.result !== "success") throw new Error("API error");

        exchangeRate = data.rates.KRW;

        document.getElementById("rateInfo").innerText = `1 USD = ${exchangeRate.toLocaleString()} KRW`;
        document.getElementById("rateDate").innerText = `Exchange Rate Date: ${data.time_last_update_utc}`;
        document.getElementById("rateLink").innerHTML = `API Source: <a href="${apiURL}" target="_blank">${apiURL}</a>`;
    } catch (err) {
        document.getElementById("rateInfo").innerText = "Failed to fetch exchange rate.";
        console.error(err);
    }
}

document.getElementById("toKrwBtn").onclick = () => {
    const usd = parseFloat(document.getElementById("usd").value);
    if (isNaN(usd)) {
        document.getElementById("krwResult").innerText = "Enter USD!";
    } else {
        document.getElementById("krwResult").innerText = (usd * exchangeRate).toLocaleString() + " KRW";
    }
};

document.getElementById("toUsdBtn").onclick = () => {
    const krw = parseFloat(document.getElementById("krw").value);
    if (isNaN(krw)) {
        document.getElementById("usdResult").innerText = "Enter KRW!";
    } else {
        document.getElementById("usdResult").innerText = (krw / exchangeRate).toFixed(2) + " USD";
    }
};

fetchRate();
