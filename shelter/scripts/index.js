console.group('Страница Main');
  console.log('Вёрстка страницы Main соответствует макету при ширине экрана 1280px: +14');
  console.log('Вёрстка страницы Main соответствует макету при ширине экрана 768px: +14');
  console.log('Вёрстка страницы Main соответствует макету при ширине экрана 320px: +14');
console.groupEnd('Страница Main');

console.group('Страница Pets');
  console.log('Вёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6');
  console.log('Вёрстка страницы Pets соответствует макету при ширине экрана 768px: +6');
  console.log('Вёрстка страницы Pets соответствует макету при ширине экрана 320px: +6');
  console.log('Интерактивность элементов +14');
console.groupEnd('Страница Pets');

console.log('Ни на одном из разрешений не появляется горизонтальная полоса прокрутки, или белые поля. Весь контент страницы при этом сохраняется: +20');
console.log('Верстка резиновая: +8');
console.log('При ширине экрана меньше 768px появляется иконка бургер-меню: +4');
console.log('Верстка обеих страниц валидная: +8');

console.log(
  '%cВсего: 100 / 100',
  'font-weight: 600; font-size: 16px;'
);

// elements
const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav-list');
const menuLinks = menu.querySelectorAll('.nav-link');
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.append(overlay);

// state
const state = {
  isMenuOpen: false,
}

// functions
const toggleMenu = () => {
  state.isMenuOpen = !state.isMenuOpen;
  burger.classList.toggle('open', state.isMenuOpen);
  menu.classList.toggle('open', state.isMenuOpen);
  toggleOverlay(state.isMenuOpen);
}

const toggleOverlay = (isOpen) => {
  overlay.classList.toggle('open', isOpen);
}

const closeEverything = () => {
  if (state.isMenuOpen) {
    toggleMenu();
  }
}

// add listeners
burger.addEventListener('click', toggleMenu);
menuLinks.forEach((link) => link.addEventListener('click', closeEverything));
overlay.addEventListener('click', closeEverything);
