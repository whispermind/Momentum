import { playList } from "./list.js";
export default function player() {
  const RANGE = document.querySelector('.player-range');
  const PLAY = document.querySelector('.play');
  const PREV = document.querySelector('.play-prev');
  const NEXT = document.querySelector('.play-next');
  const AUDIO = document.querySelector('.player-song');
  const LIST = document.querySelector('.play-list');
  let current = 0;
  playList.forEach(elem => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = elem.title;
    LIST.append(li);
  });
  PLAY.addEventListener('click', starter);
  NEXT.addEventListener('click', next);
  PREV.addEventListener('click', previous);
  AUDIO.addEventListener('timeupdate', event => { RANGE.value = event.target.currentTime; console.log(event.target.currentTime) });
  AUDIO.addEventListener('ended', next);
  RANGE.addEventListener('change', event => AUDIO.currentTime = event.target.value);
  setSong();
  function next(event) {
    current++;
    if (current === playList.length) current = 0;
    setSong();
  }
  function previous(event) {
    current--;
    if (current < 0) current = playList.length - 1;
    setSong();
  }
  function setSong() {
    RANGE.dataset.song = playList[current].title;
    RANGE.max = playList[current].duration;
    AUDIO.src = playList[current].src;
    let active = document.querySelector('.item-active');
    if (active) active.classList.remove('item-active');
    LIST.querySelector(`li:nth-child(${current + 1})`).classList.add('item-active');
    if (PLAY.classList.contains('pause')) AUDIO.play();
  }
  function starter(event) {
    if (event.target.classList.contains('pause')) {
      AUDIO.pause();
      event.target.classList.remove('pause');
    }
    else {
      AUDIO.play();
      event.target.classList.add('pause');
    }
  }
}
