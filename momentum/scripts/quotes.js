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
    let { quoteAuthor, quoteText } = await getQuote();
    setQuote(quoteText, quoteAuthor);
  }
  function setQuote(quote, author) {
    QUOTE_CONTRAINER.textContent = quote + ` \n © ${author}`;
  }
  async function getQuote() {
    const corsProxy = "https://cors-anywhere.herokuapp.com/";
    const api = `api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=${settings.lang.slice(
      0,
      2
    )}`;
    try {
      const RESPONSE = await fetch(corsProxy + api);
      return await RESPONSE.json();
    } catch (e) {}
  }
}
