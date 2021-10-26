import { settings } from "./state.js";
export default function quotes(update) {
  const FOOTER = document.querySelector('footer');
  const BUTTON = document.querySelector('.change-quote');
  const QUOTE_CONTRAINER = document.querySelector('.quote');
  const AUTHOR = document.querySelector('.author');
  if (!settings.quotes) FOOTER.style.opacity = 0;
  else FOOTER.style.opacity = '';
  if (!update) {
    BUTTON.addEventListener('click', quoteUpdate);
    BUTTON.click();
  }
  async function quoteUpdate() {
    let quote = await getQuote();
    setQuote(quote.value);
  }
  function setQuote(quote, author = 'Chuck Norris') {
    QUOTE_CONTRAINER.textContent = quote;
    AUTHOR.textContent = author;
  };
  async function getQuote() {
    const RESPONSE = await fetch('https://api.chucknorris.io/jokes/random');
    return await RESPONSE.json();
  }
}