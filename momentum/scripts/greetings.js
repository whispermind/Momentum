import { settings } from "./state.js";
export function greetings(update) {
  const GREETINGS_CONTAINER = document.querySelector('.greeting-container');
  const GREETINGS_MESSAGE = document.querySelector('.greeting');
  if (!settings.greetings) GREETINGS_CONTAINER.style.opacity = 0;
  else GREETINGS_CONTAINER.style.opacity = '';
  if (!update) {
    storageName();
    updateTime();
  }
  function updateTime() {
    GREETINGS_MESSAGE.textContent = `Good ${getDayTime()}`;
    setTimeout(updateTime, 60000);
  }
}
function storageName() {
  const USERNAME_MESSAGE = document.querySelector('.name');
  const USERNAME = localStorage.getItem('username');
  if (USERNAME) USERNAME_MESSAGE.value = USERNAME;
  USERNAME_MESSAGE.addEventListener('input', (event) => {
    localStorage.setItem('username', event.target.value);
  });
}
export function getDayTime() {
  const DAYTIME = ['night', 'morning', 'afternoon', 'evening'];
  return DAYTIME[Math.floor(new Date().getHours() / 6)];
}