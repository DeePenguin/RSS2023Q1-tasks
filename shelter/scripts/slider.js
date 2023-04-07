import { petsData, renderCard } from './cardsRender.js';

const sliderEl = document.querySelector('.slider');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
const centerSlide = sliderEl.querySelector('.slider__slide.center');
const leftSlide = sliderEl.querySelector('.slider__slide.left');
const rightSlide = sliderEl.querySelector('.slider__slide.right');

let currentArr, nextArr, pastArr;


function shuffle(excludeFromResult, length) {
  const array = [0,1,2,3,4,5,6,7];
  if (excludeFromResult.length) {
    excludeFromResult.forEach(el => {
      array.splice(array.indexOf(el), 1);
    });
  }
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.slice(0, length);
}

function createNextSlide(currentArr = []) {
  const next = shuffle(currentArr, 3);
  return next;
}

function init() {
  currentArr = createNextSlide();
  nextArr = createNextSlide(currentArr);
  pastArr = createNextSlide(currentArr);
  currentArr.forEach(id => renderCard(id, petsData[id], centerSlide));
  nextArr.forEach(id => renderCard(id, petsData[id], rightSlide));
  pastArr.forEach(id => renderCard(id, petsData[id], leftSlide));

  console.log('pastArr', pastArr, 'currentArr', currentArr, 'nextArr', nextArr)
}

function moveForward() {
  pastArr = currentArr;
  currentArr = nextArr;
  nextArr = createNextSlide(currentArr);
  console.log('pastArr', pastArr, 'currentArr', currentArr, 'nextArr', nextArr)

}

function moveBackward() {
  [pastArr, currentArr] = [currentArr, pastArr];
  nextArr = createNextSlide(currentArr);
  console.log('pastArr', pastArr, 'currentArr', currentArr, 'nextArr', nextArr)

}


init();
