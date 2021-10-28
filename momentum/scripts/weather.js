export default async function weather(update) {
  let { settings } = await import('./state.js')
  const CONTAINER = document.querySelector('.weather');
  if (!settings.weather) { CONTAINER.style.opacity = 0; return }
  else CONTAINER.style.opacity = '';
  const ERROR = document.querySelector('.weather-error');
  const DESCRIPTION = document.querySelector('.weather-description');
  const TEMPERATURE = document.querySelector('.temperature');
  const HUMIDITY = document.querySelector('.humidity');
  const WIND = document.querySelector('.wind');
  const ICON = document.querySelector('.weather-icon');
  const CITY = document.querySelector('.city');
  if (!update) weatherInit();
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
    HUMIDITY.textContent = `${settings.lang === 'english' ? 'Humidity' : 'Влажность воздуха'}: ${Math.round(info.main.humidity)}%`;
    WIND.textContent = `${settings.lang === 'english' ? 'Wind speed' : 'Скорость ветра'}: ${Math.round(info.wind.speed)} ${settings.lang === 'english' ? 'm/s' : 'м/с'}`;
    ICON.classList.add(`owf-${info.weather[0].id}`);
  }
  function weatherInit() {
    CITY.addEventListener('change', event => {
      setWeather(event.target.value);
      localStorage.setItem('city', event.target.value);
    });
  }
  function clearWeather() {
    TEMPERATURE.textContent = '';
    DESCRIPTION.textContent = '';
    HUMIDITY.textContent = '';
    WIND.textContent = '';
    for (let className of ICON.classList) {
      if (/^owf-\d+/.test(className)) ICON.classList.remove(className);
    }
  }
  async function getWeather(city) {
    let { translation } = await import('./translate.js');
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=66402a9e47202c888a359d9eb072bd6d&units=metric&lang=${translation[settings.lang].weather}`);
    return await response.json();
  }
}

