import { renderCard } from './cardsRender.js';

const sliderEl = document.querySelector('.slider');
const leftBtn = document.querySelector('#prev-btn');
const rightBtn = document.querySelector('#next-btn');
const wrapper = sliderEl.querySelector('.slider__wrapper');
const centerSlide = sliderEl.querySelector('.slider__slide.center');
const leftSlide = sliderEl.querySelector('.slider__slide.left');
const rightSlide = sliderEl.querySelector('.slider__slide.right');

let leftArr, rightArr, currentArr;
let direction;

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
  rightArr = createNextSlide(currentArr);
  leftArr = createNextSlide(currentArr);
  currentArr.forEach(id => renderCard(id, centerSlide));
  rightArr.forEach(id => renderCard(id, rightSlide));
  leftArr.forEach(id => renderCard(id, leftSlide));
  console.log('init', leftArr, currentArr, rightArr)
}

function moveRight() {
  direction = 'right';
  leftArr = currentArr;
  currentArr = rightArr;
  rightArr = createNextSlide(currentArr);
  wrapper.classList.add("transition-right");
  leftBtn.removeEventListener('click', moveLeft);
  rightBtn.removeEventListener('click', moveRight);
  console.log('right', leftArr, currentArr, rightArr)
}

function moveLeft() {
  direction = 'left';
  rightArr = currentArr;
  currentArr = leftArr;
  leftArr = createNextSlide(currentArr);
  wrapper.classList.add("transition-left");
  leftBtn.removeEventListener('click', moveLeft);
  rightBtn.removeEventListener('click', moveRight);
  console.log('left', leftArr, currentArr, rightArr)
}

function swapSlides() {
  wrapper.classList.remove(`transition-${direction}`);
  centerSlide.innerHTML = '';
  currentArr.forEach(id => renderCard(id, centerSlide));
  leftSlide.innerHTML = '';
  leftArr.forEach(id => renderCard(id, leftSlide));
  rightSlide.innerHTML = '';
  rightArr.forEach(id => renderCard(id, rightSlide));
  leftBtn.addEventListener('click', moveLeft);
  rightBtn.addEventListener('click', moveRight);
}

init();

leftBtn.addEventListener('click', moveLeft);
rightBtn.addEventListener('click', moveRight);
wrapper.addEventListener('animationend', swapSlides);
