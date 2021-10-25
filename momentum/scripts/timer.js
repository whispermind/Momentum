export default function timer() {
  const TIMER = document.querySelector('.time'),
    DATE = document.querySelector('.date');
  updateTime();
  function updateTime() {
    const currentDate = new Date();
    TIMER.textContent = currentDate.toLocaleTimeString();
    DATE.textContent = currentDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
    setTimeout(updateTime, 1000);
  }
}