import { isEscapeKey } from './util.js';
const openFullElement=document.querySelector('.big-picture');
const closeСommentsElement=document.querySelector('.social__comment-count');
const loadNewCommentsElement=document.querySelector('.comments-loader');
const bodyElement=document.querySelector('body');
const closeBigPictureElement=document.querySelector('.big-picture__cancel');
const fullPictureImageElement=document.querySelector('.big-picture__img img');
const listСommentsElement = document.querySelector('.social__comments');

const createComentTempate = (comment) => (
  `<li class="social__comment">
    <img class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
</li>`
);

const renderComents = (comments) => {
  listСommentsElement.innerHTML = '';

  comments.forEach((comment) => {
    listСommentsElement.insertAdjacentHTML('beforeend', createComentTempate(comment));
  });
};

const renderFullPicture = (({url, likes, comments, description}) => {
  fullPictureImageElement.src = url;
  openFullElement.querySelector('.likes-count').textContent = likes;
  openFullElement.querySelector('.comments-count').textContent = comments.length;
  openFullElement.querySelector('.social__caption').textContent = description;
  renderComents(comments);
  openFullPicture();
});

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPicture();
  }
};

function openFullPicture() {
  openFullElement.classList.remove('hidden');
  closeСommentsElement.classList.add('hidden');
  loadNewCommentsElement.classList.add('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);

}

function closeFullPicture() {
  openFullElement.classList.add('hidden');
  closeСommentsElement.classList.remove('hidden');
  loadNewCommentsElement.classList.remove('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
}

closeBigPictureElement.addEventListener('click',()=>{
  closeFullPicture();
});

export{renderFullPicture};
