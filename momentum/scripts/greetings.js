export function greetings() {
  const GREETINGS_CONTAINER = document.querySelector('.greeting');
  storageName();
  updateTime();
  function updateTime() {
    GREETINGS_CONTAINER.textContent = `Good ${getDayTime()}`;
    setTimeout(updateTime, 60000);
  }
}
function storageName() {
  const USERNAME_CONTAINER = document.querySelector('.name');
  const USERNAME = localStorage.getItem('username');
  if (USERNAME) USERNAME_CONTAINER.value = USERNAME;
  USERNAME_CONTAINER.addEventListener('input', (event) => {
    localStorage.setItem('username', event.target.value);
  });
}
export function getDayTime() {
  const DAYTIME = ['night', 'morning', 'afternoon', 'evening'];
  return DAYTIME[Math.floor(new Date().getHours() / 6)];
}