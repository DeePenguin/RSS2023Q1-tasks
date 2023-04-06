import './burger.js';
import { petsData, renderCard } from './cardsRender.js';

const currentPageBtn = document.getElementById('current-page');
const firstPageBtn = document.getElementById('first-page');
const previousPageBtn = document.getElementById('previous-page');
const nextPageBtn = document.getElementById('next-page');
const lastPageBtn = document.getElementById('last-page');
const wrapper = document.querySelector('.cards-wrapper');

const smallWidthMediaQuery = window.matchMedia('(max-width: 639.98px)');
const mediumWidthMediaQuery = window.matchMedia('(min-width: 640px) and (max-width: 899.98px)');
const largeWidthMediaQuery = window.matchMedia('(min-width: 900px)');

const smallPageCardsAmount = 3;
const mediumPageCardsAmount = 6;
const largePageCardsAmount = 8;

let currentPage = 1;
let lastPage;
let hasRenderedCards = false;
let cardsAmount = defineCardsAmount();
const shuffledCards = createShuffledArray();
createPages();

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

function defineCardsAmount() {
  if (largeWidthMediaQuery.matches) return largePageCardsAmount;
  if (mediumWidthMediaQuery.matches) return mediumPageCardsAmount;
  if (smallWidthMediaQuery.matches) return smallPageCardsAmount;
}

function changePageSize(e) {
  if (e.matches) {
    const newAmount = defineCardsAmount();
    lastPage = shuffledCards.length / newAmount;
    currentPage = currentPage > 1 ? Math.ceil((currentPage - 1) * cardsAmount / newAmount) : 1;
    cardsAmount = newAmount;
    showCurrentPage();
  }
}

function createPages() {
  lastPage = shuffledCards.length / cardsAmount;
  showCurrentPage();
}

function showCurrentPage() {
  currentPageBtn.innerText = currentPage;
  toggleButtonsDisability();
  if (hasRenderedCards) {
    const height = wrapper.offsetHeight;
    wrapper.style.height = height + 'px';
    wrapper.innerHTML = '';
  }
  const startIndex = currentPage > 1 ? (currentPage - 1) * cardsAmount : 0;
  const cardsForPage = shuffledCards.slice(startIndex, currentPage * cardsAmount);
  cardsForPage.forEach(id => renderCard(id, petsData[id], wrapper));
  hasRenderedCards = true;
  wrapper.style.height = '';
  console.log(`Page ${currentPage}:`, cardsForPage);
  if(wrapper.getBoundingClientRect().top < 0) wrapper.scrollIntoView();
}

function toggleButtonsDisability() {
  const [isFirst, isLast] = [currentPage === 1, currentPage === lastPage];
  firstPageBtn.classList.toggle('btn_disabled', isFirst);
  previousPageBtn.classList.toggle('btn_disabled', isFirst);
  nextPageBtn.classList.toggle('btn_disabled', isLast);
  lastPageBtn.classList.toggle('btn_disabled', isLast);
}

function goToFirstPage() {
  currentPage = 1;
  showCurrentPage();
}

function goToLastPage() {
  currentPage = lastPage;
  showCurrentPage();
}

function goToNextPage() {
  currentPage += 1;
  showCurrentPage();
}

function goToPreviousPage() {
  currentPage -= 1;
  showCurrentPage();
}

firstPageBtn.addEventListener('click', goToFirstPage);
lastPageBtn.addEventListener('click', goToLastPage);
previousPageBtn.addEventListener('click', goToPreviousPage);
nextPageBtn.addEventListener('click', goToNextPage);
largeWidthMediaQuery.addEventListener('change', changePageSize);
mediumWidthMediaQuery.addEventListener('change', changePageSize);
smallWidthMediaQuery.addEventListener('change', changePageSize);
