import { getDayTime } from "./greetings.js";
export default async function slider() {
  let current = getRandomInt(1, 19);
  document.body.style.backgroundImage = `url(https://raw.githubusercontent.com/whispermind/stage1-tasks/assets/images/${getDayTime()}/${current < 10 ? '0' + current : current}.jpg)`;
  const SLIDER_NAV = document.querySelector('.slider-icons');
  const FLICKR_RESPONSE = await getData(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f1d1e25e63b77ed91af6b5fe0b0a65ac&tags=${getDayTime()}&extras=url_l&format=json&nojsoncallback=1&per_page=20`);
  const UNSPLASH_RESPONSE = await getData(`https://api.unsplash.com/search/photos/?client_id=SaIx04gu2ik9Jsm_ExeT4Ah7u5sXqhPnd7bo-oZouyA&orientation=landscape&query=${getDayTime()}&per_page=20`);
  const FLICKR_URLS = FLICKR_RESPONSE.photos.photo;
  const UNSPLASH_URLS = UNSPLASH_RESPONSE.results;
  let processed = false;
  SLIDER_NAV.style.opacity = 1;

  SLIDER_NAV.addEventListener('click', event => {
    if (processed) return
    processed = true;
    if (event.target.classList.contains('slide-prev')) current--
    if (event.target.classList.contains('slide-next')) current++
    if (current > 19) current = 0;
    if (current < 0) current = 19;
    setImage();
  });

  function setImage() {
    let url = null;
    if (getDayTime() === 'night') {
      url = FLICKR_URLS[current].url_l;
    } else {
      url = UNSPLASH_URLS[current].urls.full;
    }
    const img = document.createElement('img');
    img.src = url;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${url})`;
      setTimeout(() => processed = false, 2000);
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