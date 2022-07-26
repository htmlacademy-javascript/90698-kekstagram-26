import { isEscapeKey } from './util.js';
const openFullElement=document.querySelector('.big-picture');
const countCommentsElement=document.querySelector('.social__comment-count');
const loadNewCommentsElement=document.querySelector('.social__comments-loader');
const bodyElement=document.querySelector('body');
const closeBigPictureElement=document.querySelector('.big-picture__cancel');
const fullPictureImageElement=document.querySelector('.big-picture__img img');
const listСommentsElement = document.querySelector('.social__comments');
const ofElement=countCommentsElement.querySelector('.of');
const MAX_STEP_COMMENTS=5;
let commentsHandler = 0;


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
    ofElement.textContent = `${listСommentsElement.children.length } из `;
  });
};

const newRenderComments = (comments) => {
  const copyComments = comments.slice();
  listСommentsElement.innerHTML = '';

  const onClickCommentsHandler = () => {
    addComments(copyComments);
  };

  commentsHandler = onClickCommentsHandler;

  if(copyComments.length <= MAX_STEP_COMMENTS) {
    loadNewCommentsElement.classList.add('hidden');
    renderComents(copyComments);
  } else {
    loadNewCommentsElement.classList.remove('hidden');
    renderComents(copyComments.splice(0, MAX_STEP_COMMENTS));
    loadNewCommentsElement.addEventListener('click', commentsHandler);
  }
};
function addComments (copyComments) {
  if (copyComments.length <= MAX_STEP_COMMENTS) {
    loadNewCommentsElement.classList.add('hidden');
  }
  renderComents(copyComments.splice(0,MAX_STEP_COMMENTS));
}


const renderFullPicture = (({url, likes, comments, description}) => {
  fullPictureImageElement.src = url;
  openFullElement.querySelector('.likes-count').textContent = likes;
  openFullElement.querySelector('.comments-count').textContent = comments.length;
  openFullElement.querySelector('.social__caption').textContent = description;
  newRenderComments(comments);
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

export{renderFullPicture};
