import { settings } from "./state.js";
export default function timer(update) {
  const TIMER = document.querySelector('.time');
  const DATE = document.querySelector('.date');
  if (!settings.time) TIMER.style.opacity = 0;
  else TIMER.style.opacity = '';
  if (!settings.date) DATE.style.opacity = 0;
  else DATE.style.opacity = '';
  if (!update) updateTime();
  function updateTime() {
    const currentDate = new Date();
    TIMER.textContent = currentDate.toLocaleTimeString();
    DATE.textContent = currentDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
    setTimeout(updateTime, 1000);
  }
}