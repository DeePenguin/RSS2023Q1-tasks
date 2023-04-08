import {state, overlay, toggleOverlay} from './overlay.js';

export const petsData = await getPetsInfo();

async function getPetsInfo() {
  const res = await fetch('./assets/pets.json');
  const data = await res.json();
  return data.reduce((acc, value, i) => {acc[i] = value; return acc;}, {})
}

export const renderCard = (id, parent) => {
  const info = petsData[id];
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

function showModal () {
  const id = this.dataset.petId;
  const pet = petsData[id];
  const node = `
  <div class="popup">
    <button class="btn btn_round" id="close-btn">&#10006;</button>
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
  document.getElementById('close-btn').onclick = closeModal;
  state.isModalOpen = true;
  toggleOverlay(state.isModalOpen);
}

function closeModal(e) {
  if (e) e.stopImmediatePropagation();
  state.isModalOpen = false;
  toggleOverlay(state.isModalOpen);
  overlay.innerHTML = '';
}

state.closeModal = closeModal;
