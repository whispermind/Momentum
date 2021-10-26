import timer from "./timer.js";
import { greetings } from "./greetings.js";
import slider from "./slider.js";
import weather from "./weather.js";
import quotes from "./quotes.js";
import player from "./player.js";

export let settings = {
  lang: 'en',
  api: 'git',
  tags: '',
  player: true,
  time: true,
  quotes: true,
  weather: true,
  greetings: true,
  date: true,
};
export default function stateChange() {
  const CLOSE = document.querySelector('.state-close');
  const OPEN = document.querySelector('.state-open');
  const STATE = document.querySelector('.state-options');
  const TAGS = document.querySelector('label[for="tags"]');
  const STORAGE = localStorage.getItem('settings');
  const OBSERVER = new Proxy(settings, {
    set: function (target, key, value) {
      target[key] = value;
      switch (key) {
        case 'lang': break;
        case 'api': slider(true); break;
        case 'tags': slider(true); break;
        case 'player': player(true); break;
        case 'time': timer(true); break;
        case 'date': timer(true); break;
        case 'quotes': quotes(true); break;
        case 'weather': weather(true); break;
        case 'greetings': greetings(true); break;
      }
      return true;
    }
  });
  if (STORAGE) {
    settings = JSON.parse(STORAGE);
    
  }
  OPEN.addEventListener('click', event => { STATE.style.transition = '1s ease-in-out'; STATE.style.right = '0' });
  CLOSE.addEventListener('click', event => STATE.style.right = '');
  STATE.addEventListener('change', event => {
    OBSERVER[event.target.id] = event.target.value === 'on' ? event.target.checked : event.target.value;
    if (settings.api !== 'git') { TAGS.style.opacity = 1; TAGS.querySelector('input').disabled = false; }
    else { TAGS.style.opacity = ''; TAGS.readonly = ''; TAGS.querySelector('input').disabled = true; };
    localStorage.setItem('settings', JSON.stringify(settings));
  });
}