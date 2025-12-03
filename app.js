const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let option = document.createElement("option");
        option.value = currCode;
        option.innerText = currCode;

        if (select.name === "from" && currCode === "USD") option.selected = true;
        if (select.name === "to" && currCode === "INR") option.selected = true;

        select.append(option);
    }

    select.addEventListener("change", (e) => updateFlag(e.target));
}
function updateFlag(element) {
    const code = element.value;
    const countryCode = countryList[code];
    element.parentElement.querySelector("img").src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}
async function updateExchangeRate() {
    let amtVal = document.querySelector(".amount input").value;
    if (!amtVal || amtVal < 1) {
        amtVal = 1;
        document.querySelector(".amount input").value = 1;
    }

    const from = fromCurr.value;
    const to = toCurr.value;

    const URL = `https://api.exchangerate-api.com/v4/latest/${from}`;
    const res = await fetch(URL);
    const data = await res.json();

    const rate = data.rates[to];
    const finalAmount = amtVal * rate;

    msg.innerText = `${amtVal} ${from} = ${finalAmount.toFixed(2)} ${to}`;
}
btn.addEventListener("click", (e) => {
    e.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", updateExchangeRate);
