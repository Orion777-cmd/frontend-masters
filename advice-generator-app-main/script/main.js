const quote_number = document.getElementById('quote--number');
const advice = document.querySelector(".advice__text");

// console.log(advice)
const button = document.getElementById("change--advice");

button.addEventListener("click", getNewAdvice);

function getNewAdvice(){

    fetch(`https://api.adviceslip.com/advice`)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        
        advice.textContent = data.slip.advice;
        quote_number.textContent = data.slip.id;
    });
}