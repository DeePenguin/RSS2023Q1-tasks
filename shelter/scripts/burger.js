import {state, toggleOverlay} from './overlay.js'

const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav-list');
const menuLinks = menu.querySelectorAll('.nav-link');

const toggleMenu = () => {
  state.isMenuOpen = !state.isMenuOpen;
  burger.classList.toggle('open', state.isMenuOpen);
  menu.classList.toggle('open', state.isMenuOpen);
  toggleOverlay(state.isMenuOpen);
}

state.closeMenu = toggleMenu;

burger.addEventListener('click', toggleMenu);
menuLinks.forEach((link) => link.addEventListener('click', toggleMenu));
