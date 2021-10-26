export default function quotes() {
  const BUTTON = document.querySelector('.change-quote');
  const QUOTE_CONTRAINER = document.querySelector('.quote');
  const AUTHOR = document.querySelector('.author');
  BUTTON.addEventListener('click', async function () {
    let quote = await getQuote();
    setQuote(quote.value);
  });
  BUTTON.click();
  function setQuote(quote, author = 'Chuck Norris') {
    QUOTE_CONTRAINER.textContent = quote;
    AUTHOR.textContent = author;
  };
  async function getQuote() {
    const RESPONSE = await fetch('https://api.chucknorris.io/jokes/random');
    return await RESPONSE.json();
  }
}