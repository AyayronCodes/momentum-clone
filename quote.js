const quote = document.querySelector(".quote");

async function getRandomQuote() {
  const file = await fetch("https://api.adviceslip.com/advice");
  const result = await file.json();
  const quote = result.slip.advice;
  return quote;
}

function toggleQuote() {
  quote.classList.toggle("hidden");
}

async function quotesInit() {
  toggleQuote();
  quote.innerText = await getRandomQuote();
  toggleQuote();
}

window.addEventListener("load", quotesInit);
