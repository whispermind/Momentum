export default function greetings() {
  const CURRENT_TIME = new Date();
  const DAYTIME = ['night', 'morning', 'afternoon', 'evening'];
  const GREETINGS_CONTAINER = document.querySelector('.greeting');
  storageName();
  updateTime();
  function updateTime() {
    GREETINGS_CONTAINER.textContent = `Good ${DAYTIME[Math.floor(CURRENT_TIME.getHours() / 6)]}`;
    setTimeout(() => {
      updateTime();
    }, 60000);
  }
  function storageName() {
    const USERNAME_CONTAINER = document.querySelector('.name');
    const USERNAME = localStorage.getItem('username');
    if (USERNAME) USERNAME_CONTAINER.value = USERNAME;
    USERNAME_CONTAINER.addEventListener('input', (event) => {
      localStorage.setItem('username', event.target.value);
    });
  }
}