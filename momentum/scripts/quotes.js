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
    let { content, originator } = await getQuote();
    setQuote(content, originator.name);
  }
  function setQuote(quote, author) {
    QUOTE_CONTRAINER.textContent = quote + ` \n © ${author}`;
  }
  async function getQuote() {
    const api = `https://quotes15.p.rapidapi.com/quotes/random/?language_code=${settings.lang.slice(
      0,
      2
    )}`;

    try {
      const RESPONSE = await fetch(api, {
        headers: {
          "X-RapidAPI-Key":
            "511806d988msh3b2ecfb6d3bf7c9p1f1fa7jsnedead4564e84",
          "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
        },
      });
      return await RESPONSE.json();
    } catch (e) {}
  }
}
