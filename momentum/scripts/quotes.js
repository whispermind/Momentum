import { settings } from "./state.js";
export default function quotes(update) {
  const FOOTER = document.querySelector("footer");
  const BUTTON = document.querySelector(".change-quote");
  const QUOTE_CONTRAINER = document.querySelector(".quote");
  if (!settings.quotes) FOOTER.style.opacity = 0;
  else FOOTER.style.opacity = "";
  if (!update) {
    BUTTON.addEventListener("click", quoteUpdate);
    BUTTON.click();
  }
  async function quoteUpdate() {
    let quote = await getQuote();
    setQuote(quote.value);
  }
  function setQuote(quote, author = "Chuck Norris") {
    QUOTE_CONTRAINER.textContent = quote + ` \n © ${author}`;
  }
  async function getQuote() {
    try {
      const RESPONSE = await fetch("https://api.chucknorris.io/jokes/random");
      return await RESPONSE.json();
    } catch (e) {}
  }
}
