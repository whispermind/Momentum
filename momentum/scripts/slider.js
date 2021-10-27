import { getDayTime } from "./greetings.js";
const SLIDER_NAV = document.querySelector('.slider-icons');
let unsplash = null;
let flickr = null;
export default async function slider(update) {
  const { settings } = await import('./state.js');
  if (settings.api === 'unsplash') unsplash = await getData(`https://api.unsplash.com/search/photos/?client_id=SaIx04gu2ik9Jsm_ExeT4Ah7u5sXqhPnd7bo-oZouyA&orientation=landscape&query=${settings.tags ? settings.tags : getDayTime()}&per_page=20`);
  if (settings.api === 'flickr') flickr = await getData(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f1d1e25e63b77ed91af6b5fe0b0a65ac&tags=${settings.tags ? settings.tags : getDayTime()}&extras=url_l&format=json&nojsoncallback=1&per_page=20`);
  let processed = false;
  if (!update) {
    SLIDER_NAV.dataset.current = getRandomInt(0, 19);
    setImage();
    SLIDER_NAV.addEventListener('click', async function (event) {
      if (processed) return
      processed = true;
      if (event.target.classList.contains('slide-prev')) SLIDER_NAV.dataset.current--
      if (event.target.classList.contains('slide-next')) SLIDER_NAV.dataset.current++
      if (SLIDER_NAV.dataset.current > 19) SLIDER_NAV.dataset.current = 0;
      if (SLIDER_NAV.dataset.current < 0) SLIDER_NAV.dataset.current = 19;
      setImage();
    });
  }
  async function setImage() {
    const flickrCollection = flickr?.photos.photo;
    const unsplashCollection = unsplash?.results;
    const img = document.createElement('img');
    let url = null;
    if (settings.api === 'unsplash') url = unsplashCollection[SLIDER_NAV.dataset.current].urls.regular;
    if (settings.api === 'flickr') url = flickrCollection[SLIDER_NAV.dataset.current].url_l;
    if (settings.api === 'git') url = `https://raw.githubusercontent.com/whispermind/stage1-tasks/assets/images/${getDayTime()}/${SLIDER_NAV.dataset.current < 9 ? '0' + (Number(SLIDER_NAV.dataset.current) + 1) : Number(SLIDER_NAV.dataset.current) + 1}.jpg`;

    img.src = url;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${url})`;
      setTimeout(() => processed = false, 1500);
    };
  }
}
async function getData(url) {
  const RESPONSE = await fetch(url);
  return await RESPONSE.json();
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}