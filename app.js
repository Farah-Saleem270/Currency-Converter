let apiKey = "You API Key";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");


for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "PKR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}



const updateFlag = (element) => {
    console.log(element);
    let currCode = element.value;
    console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("laod", () => {
    getExchangeRate();
});


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    getExchangeRate();
});


function getExchangeRate() {
    let amount = document.querySelector(".amount input"),
    exchangeRateTxt = document.querySelector(".msg");
    let amtVal = amount.value;
    console.log(amtVal);
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
     exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurr.value}`;
    fetch(url).then(respons => (respons.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurr.value];
        // console.log(exchangeRate);
        let totalExchangeRate = (amtVal * exchangeRate).toFixed(2);
        console.log(totalExchangeRate);
        exchangeRateTxt.innerText = `${amtVal} ${fromCurr.value} = ${totalExchangeRate} ${toCurr.value}`;
    }))

}





