export default async function timer(update) {
  const { settings } = await import("./state.js");
  const { translation } = await import("./translate.js");
  const TIMER = document.querySelector('.time');
  const DATE = document.querySelector('.date');
  if (!settings.time) TIMER.style.opacity = 0;
  else TIMER.style.opacity = '';
  if (!settings.date) DATE.style.opacity = 0;
  else DATE.style.opacity = '';
  if (!update) updateTime();
  function updateTime() {
    const currentDate = new Date();
    TIMER.textContent = currentDate.toLocaleTimeString(translation[settings.lang].time);
    DATE.textContent = currentDate.toLocaleDateString(translation[settings.lang].time, { weekday: 'long', month: 'long', day: 'numeric' });
    setTimeout(updateTime, 1000);
  }
}