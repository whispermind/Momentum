
export default function weather() {
  const ERROR = document.querySelector('.weather-error');
  const DESCRIPTION = document.querySelector('.weather-description');
  const TEMPERATURE = document.querySelector('.temperature');
  const HUMIDITY = document.querySelector('.humidity');
  const WIND = document.querySelector('.wind');
  const ICON = document.querySelector('.weather-icon');
  const CITY = document.querySelector('.city');
  CITY.addEventListener('change', event => {
    setWeather(event.target.value);
    localStorage.setItem('city', event.target.value);
  });
  let STORAGE = localStorage.getItem('city');
  STORAGE ? CITY.value = STORAGE : STORAGE = 'Minsk';
  setWeather(STORAGE);
  async function setWeather(city) {
    const info = await getWeather(city);
    if (info.cod !== 200) {
      ERROR.textContent = info.message;
      clearWeather();
      return
    }
    ERROR.textContent = '';
    TEMPERATURE.textContent = `${Math.round(info.main.temp)}°C`;
    DESCRIPTION.textContent = info.weather[0].description;
    HUMIDITY.textContent = `Humidity: ${Math.round(info.main.humidity)}%`;
    WIND.textContent = `Wind speed: ${Math.round(info.wind.speed)} m/s`;
    ICON.classList.add(`owf-${info.weather[0].id}`);
  }
  function clearWeather() {
    TEMPERATURE.textContent = '';
    DESCRIPTION.textContent = '';
    HUMIDITY.textContent = '';
    WIND.textContent = '';
    for (let className of ICON.classList) {
      if (/^owf-\d+/.test(className)) { console.log(className); ICON.classList.remove(className); }
    }
  }
}
async function getWeather(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=66402a9e47202c888a359d9eb072bd6d&units=metric`);
  return await response.json();
}
