import timer from "./timer.js";
import { greetings } from "./greetings.js";
import slider from "./slider.js";
import weather from "./weather.js";
import quotes from "./quotes.js";
import player from "./player.js";
const qouteButton = document.querySelector(".change-quote");

export let settings = {
  lang: "english",
  api: "git",
  tags: "",
  player: true,
  time: true,
  quotes: true,
  weather: true,
  greetings: true,
  date: true,
};
export default function stateChange() {
  const CLOSE = document.querySelector(".state-close");
  const OPEN = document.querySelector(".state-open");
  const STATE = document.querySelector(".state-options");
  const TAGS = document.querySelector('label[for="tags"]');
  const STORAGE = localStorage.getItem("settings");
  if (STORAGE) {
    settings = JSON.parse(STORAGE);
    setStorage();
    changeLangs();
  }
  const OBSERVER = new Proxy(settings, {
    set: function (target, key, value) {
      target[key] = value;
      switch (key) {
        case "lang":
          weather(true);
          greetings(true);
          qouteButton.click();
          changeLangs();
          break;
        case "api":
          slider(true);
          break;
        case "tags":
          slider(true);
          break;
        case "player":
          player(true);
          break;
        case "time":
          timer(true);
          break;
        case "date":
          timer(true);
          break;
        case "quotes":
          quotes(true);
          break;
        case "weather":
          weather(true);
          break;
        case "greetings":
          greetings(true);
          break;
      }
      return true;
    },
  });

  OPEN.addEventListener("click", (event) => {
    STATE.style.transform = "translate(0)";
  });
  CLOSE.addEventListener("click", (event) => (STATE.style.transform = ""));
  STATE.addEventListener("change", (event) => {
    OBSERVER[event.target.id] =
      event.target.value === "on" ? event.target.checked : event.target.value;
    if (event.target.id === "player") {
      const audio = document.querySelector("audio");
      const button = document.querySelector(".pause");
      audio.pause();
      button.classList.remove("pause");
    }
    if (settings.api !== "git") {
      TAGS.style.opacity = 1;
      TAGS.querySelector("input").disabled = false;
    } else {
      TAGS.style.opacity = "";
      TAGS.readonly = "";
      TAGS.querySelector("input").disabled = true;
    }
    localStorage.setItem("settings", JSON.stringify(settings));
  });
  function setStorage() {
    document.querySelector(`option[value=${settings.lang}]`).selected = true;
    document.querySelector(`option[value=${settings.api}]`).selected = true;
    if (settings.api !== "git") {
      let tag = document.querySelector('label[for="tags"]');
      tag.style.opacity = 1;
      tag.querySelector("input").disabled = false;
    }
    document.querySelector("#tags").value = settings.tags;
    document.querySelector("#player").checked = settings.player;
    document.querySelector("#time").checked = settings.time;
    document.querySelector("#date").checked = settings.date;
    document.querySelector("#quotes").checked = settings.quotes;
    document.querySelector("#weather").checked = settings.weather;
    document.querySelector("#greetings").checked = settings.greetings;
  }
}

export function changeLangs() {
  const english = [
    "Language:",
    "Image API:",
    "Tags:",
    "Weather:",
    "Quotes:",
    "Player:",
    "Time:",
    "Greetings:",
    "Date:",
  ];
  const russian = [
    "Язык:",
    "АПИ:",
    "Теги:",
    "Погода:",
    "Цитаты:",
    "Плеер:",
    "Время:",
    "Приветствие:",
    "Дата:",
  ];
  const options = document.querySelector(".state-options");
  const heading = options.querySelector("h2");
  const fields = options.querySelectorAll("label");
  const weatherInput = document.querySelector(".city");
  const greetingsInput = document.querySelector(".name");
  greetingsInput.placeholder =
    settings.lang === "english" ? "[Enter name]" : "[Введите имя]";
  weatherInput.defaultValue = settings.lang === "english" ? "Kyiv" : "Киев";
  heading.textContent = settings.lang === "english" ? "Options" : "Опции";
  fields.forEach((field, index) => {
    field.firstChild.nodeValue =
      settings.lang === "english" ? english[index] : russian[index];
  });
}
