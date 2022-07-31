import { isEscapeKey } from './util.js';

const MAX_STEP_COMMENTS=5;

const openFullElement=document.querySelector('.big-picture');
const countCommentsElement=openFullElement.querySelector('.social__comment-count');
const bodyElement=document.querySelector('body');
const closeBigPictureElement=openFullElement.querySelector('.big-picture__cancel');
const fullPictureImageElement=openFullElement.querySelector('.big-picture__img img');
const listCommentsElement = openFullElement.querySelector('.social__comments');
const buttonLoadElement = openFullElement.querySelector('.comments-loader');
let commentsModule;
let count;

const createCommentTemplate = (comment) => (
  `<li class="social__comment">
    <img class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
</li>`
);

const renderComments = () => {
  listCommentsElement.innerHTML = '';
  const commentsRender = commentsModule.slice(0, count);
  commentsRender.forEach((comment) => {
    listCommentsElement.insertAdjacentHTML('beforeend', createCommentTemplate(comment));
  });

  const isHideButton = commentsRender.length >= commentsModule.length;
  buttonLoadElement.classList.toggle('hidden', isHideButton);
  countCommentsElement.innerHTML = `${commentsRender.length} из <span class="comments-count">${commentsModule.length}</span> комментариев`;
};

const commentsLoaderOnClick = () => {
  count += MAX_STEP_COMMENTS;
  renderComments();
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPicture();
  }
};

function openFullPicture() {
  openFullElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeFullPicture() {
  openFullElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

closeBigPictureElement.addEventListener('click',()=>{
  closeFullPicture();
});

const renderFullPicture = (({url, likes, comments, description}) => {
  fullPictureImageElement.src = url;
  openFullElement.querySelector('.likes-count').textContent = likes;
  openFullElement.querySelector('.comments-count').textContent = comments.length;
  openFullElement.querySelector('.social__caption').textContent = description;
  commentsModule = comments;
  count = comments.length < MAX_STEP_COMMENTS ? comments.length : MAX_STEP_COMMENTS;
  renderComments();
  buttonLoadElement.addEventListener('click', commentsLoaderOnClick);
  openFullPicture();
});
export{renderFullPicture};
