import timer from "./timer.js";
import { greetings } from "./greetings.js";
import slider from "./slider.js";
import weather from "./weather.js";
import quotes from "./quotes.js";
import player from "./player.js";
import state from "./state.js";
(function () {
  state();
  slider();
  timer();
  greetings();
  weather();
  quotes();
  player();
})();