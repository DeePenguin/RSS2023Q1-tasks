import './burger.js';
import { petsData, renderCard } from './cardsRender.js';







const shuffledCards = createShuffledArray();

function shuffle() {
  const array = [0,1,2,3,4,5,6,7];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createShuffledArray() {
  const result = shuffle();
  for (let i = 0; i < 5; i++) {
    const head = result.length % 6
      ? result.slice(-result.length % 6)
      : [];
    let tail = shuffle();
    let set = new Set([...head, ...tail].slice(0, 6));
    while (set.size !== 6) {
      tail = shuffle();
      set = new Set([...head, ...tail].slice(0, 6));
    }
    result.push(...tail);
  }
  return result;
}

function createPages() {
  console.log(shuffledCards);
}

window.addEventListener('DOMContentLoaded', createPages);
