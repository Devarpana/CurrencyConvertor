 const dropdowns = document.querySelectorAll(".dropdown select");
 let btn = document.querySelector("button")
 let msg = document.querySelector(".msg")
for(let select of dropdowns){
    for (code in countryList){
        let newOption = document.createElement("option")
        newOption.value = code.toLowerCase()
        newOption.innerText = code
        if(select.name == "from" && code == "USD"){
            newOption.selected = "selected"
        }
        else if( select.name=="to" && code == "INR"){
            newOption.selected = "selected"
        }
        select.append(newOption)
    }
     select.addEventListener("change", (event)=>{
        updateFlag(event.target)
    })
}

function updateFlag(ele){
   let img = ele.previousElementSibling
   let val = countryList[ele.value.toUpperCase()];
    if (val) {
      img.src = `https://flagsapi.com/${val}/flat/64.png`;
    } else {
     img.src = "https://via.placeholder.com/64?text=?"; 
   }
}


async function currCovertor(){
    let rate, total
    let fromVal = document.querySelector(".from select").value;
    let toVal = document.querySelector(".to select").value;
    let amount = document.querySelector(".amount input")
    let finalAmount = document.querySelectorAll(".amount input")[1]
    if(amount.value === "" || amount.value<1){
        amount.value = 1
    }
     console.log(amount.value)
    const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromVal}.json`
    let res = await fetch(BASE_URL)
    let data = await res.json()
    rate = data[fromVal][toVal]
    total = Math.round(rate * amount.value)
    msg.innerText = `1 ${fromVal.toUpperCase()} = ${Math.round(rate)} ${toVal.toUpperCase()}`
    finalAmount.value = total
}
btn.addEventListener("click", (event)=>{
        event.preventDefault()
        currCovertor()
    })