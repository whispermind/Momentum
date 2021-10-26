import { playList } from "./list.js";
export default function player() {
  const RANGE = document.querySelector('.player-range');
  const PLAY = document.querySelector('.play');
  const PREV = document.querySelector('.play-prev');
  const NEXT = document.querySelector('.play-next');
  const AUDIO = document.querySelector('.player-song');
  const LIST = document.querySelector('.play-list');
  const VOLUME = document.querySelector('.player-volume-range');
  const VOLUME_ICON = document.querySelector('.player-volume-icon');
  let current = 0;

  playList.forEach((elem, index) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.classList.add('play', 'list-icon', 'player-icon');
    li.dataset.index = index;
    li.classList.add('play-item');
    li.textContent = elem.title;
    li.append(button);
    LIST.append(li);
  });

  PLAY.addEventListener('click', starter);
  NEXT.addEventListener('click', next);
  PREV.addEventListener('click', previous);
  AUDIO.addEventListener('ended', next);
  VOLUME_ICON.addEventListener('click', volumeToggle);
  LIST.addEventListener('click', listToggle);

  RANGE.addEventListener('change', event => AUDIO.currentTime = event.target.value);

  AUDIO.addEventListener('timeupdate', event => {
    const POSITION = Math.round(event.target.currentTime);
    RANGE.value = POSITION;
    RANGE.dataset.current = `${POSITION}s / ${playList[current].duration}s`;
  });

  VOLUME.addEventListener('change', event => {
    AUDIO.volume = event.target.value;
    VOLUME.dataset.volume = event.target.value;
    if (!AUDIO.volume) VOLUME_ICON.classList.add('volume-off');
    else VOLUME_ICON.classList.remove('volume-off');
  });

  setSong();

  function listToggle(event) {
    let elemIndex = Number(event.target.closest('.play-item').dataset.index);
    if (elemIndex === current) {
      starter(PLAY);
      return
    }
    current = elemIndex;
    const ACTIVE = LIST.querySelector('.pause');
    if (ACTIVE) ACTIVE.classList.remove('pause');
    PLAY.classList.remove('pause');
    setSong();
    starter(PLAY);
  }

  function volumeToggle(event) {
    if (event.target.classList.contains('volume-off')) {
      AUDIO.volume = VOLUME.dataset.volume;
      VOLUME.value = VOLUME.dataset.volume;
    }
    else {
      AUDIO.volume = 0;
      VOLUME.value = 0;
    }
    event.target.classList.toggle('volume-off');
  }
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
  function starter() {
    const ACTIVE = LIST.querySelector(`li:nth-child(${current + 1}) button`);
    if (PLAY.classList.contains('pause')) {
      AUDIO.pause();
      PLAY.classList.remove('pause');
      ACTIVE.classList.remove('pause');
    }
    else {
      AUDIO.play();
      PLAY.classList.add('pause');
      ACTIVE.classList.add('pause');
    }
  }
}
