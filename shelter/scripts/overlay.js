export const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.append(overlay);

export const state = {};

export const toggleOverlay = (isOpen) => {
  overlay.classList.toggle('open', isOpen);
  document.body.classList.toggle('modal-open', isOpen);
}

export const closeEverything = (e) => {
  if (e.target !== overlay) return;
  if (state.isMenuOpen) state.closeMenu();
  if (state.isModalOpen) state.closeModal();
}

overlay.addEventListener('click', closeEverything);
