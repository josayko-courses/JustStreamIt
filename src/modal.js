const modal = document.querySelector('#simpleModal');

function openModal(e) {
  modal.style.display = 'block';
  console.log(e);
}

function closeModal(e) {
  modal.style.display = 'none';
}

function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

export { openModal, outsideClick, closeModal };
