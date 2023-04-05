// elements
const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav-list');
const menuLinks = menu.querySelectorAll('.nav-link');
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.append(overlay);

// state and data
const state = {
  isMenuOpen: false,
  isModalOpen: false,
}
const petsData = {};

// functions
const toggleMenu = () => {
  state.isMenuOpen = !state.isMenuOpen;
  burger.classList.toggle('open', state.isMenuOpen);
  menu.classList.toggle('open', state.isMenuOpen);
  toggleOverlay(state.isMenuOpen);
}

const toggleOverlay = (isOpen) => {
  overlay.classList.toggle('open', isOpen);
  document.body.classList.toggle('modal-open', isOpen);
}

const closeEverything = () => {
  if (state.isMenuOpen) toggleMenu();
  else if (state.isModalOpen) closeModal();
}

// cards render
const getPetsInfo = async () => {
  const res = await fetch('./assets/pets.json');
  const data = await res.json();
  savePetsInfo(data);
  // renderCard(data[0], document.querySelector('.slider__slide'));
  Object.entries(petsData).map(([id, info]) => renderCard(id, info, document.querySelector('.cards-wrapper')))
}

const savePetsInfo = (data) => {
  data.forEach((obj, i) => petsData[i] = obj);
}

const renderCard = (id, info, parent) => {
  const card = document.createElement('div');
  card.className = 'pet-card';
  card.dataset.petId = id;
  card.onclick = showModal;
  card.innerHTML = `
      <div class="pet-card__pic">
        <img class="pet-card__img" src="${info.thumb}" alt="${info.name} photo">
      </div>
      <p class="pet-card__title">
      ${info.name}
      </p>
      <button class="btn" type="button">Learn more</button>
  `;
  parent.append(card);
}

function showModal (e) {
  const id = this.dataset.petId;
  const pet = petsData[id];
  const node = `
  <div class="popup">
    <button class="btn btn_round" onclick="closeModal()">&#10006;</button>
    <div class="popup-pic">
      <img src="${pet.img}" alt="${pet.name} photo" class="popup-img">
    </div>
    <div class="popup-content">
      <header class="popup-header">
        <h4 class="popup-title">
          ${pet.name}
        </h4>
        <p class="popup-subtitle">
          <span class="species">${pet.type}</span> - <span class="breed">${pet.breed}</span>
        </p>
      </header>
      <p class="popup-description">
      ${pet.description}
      </p>
      <ul class="popup-list">
        <li class="popup-list-item">
          <span class="property">Age: </span><span class="description">${pet.age}</span>
        </li>
        <li class="popup-list-item">
          <span class="property">Inoculations: </span><span class="description">${pet.inoculations.join(', ')}</span>
        </li>
        <li class="popup-list-item">
          <span class="property">Diseases: </span><span class="description">${pet.diseases.join(', ')}</span>
        </li>
        <li class="popup-list-item">
          <span class="property">Parasites: </span><span class="description">${pet.parasites.join(', ')}</span>
        </li>
      </ul>
    </div>
  </div>
  `;
  overlay.innerHTML = node;
  state.isModalOpen = true;
  toggleOverlay(state.isModalOpen);
}

const closeModal = () => {
  state.isModalOpen = false;
  toggleOverlay(state.isModalOpen);
  overlay.innerHTML = '';
}

// add listeners
window.addEventListener('DOMContentLoaded', getPetsInfo);
burger.addEventListener('click', toggleMenu);
menuLinks.forEach((link) => link.addEventListener('click', closeEverything));
overlay.addEventListener('click', closeEverything);
