import { isEscapeKey } from './util.js';

const MAX_STEP_COMMENTS=5;

const openFullElement=document.querySelector('.big-picture');
const countCommentsElement=document.querySelector('.social__comment-count');
const bodyElement=document.querySelector('body');
const closeBigPictureElement=document.querySelector('.big-picture__cancel');
const fullPictureImageElement=document.querySelector('.big-picture__img img');
const listCommentsElement = document.querySelector('.social__comments');
const ofElement=countCommentsElement.querySelector('.of');
const buttonLoadElement = document.querySelector('.comments-loader');
let commentsHandler = 0;

const createElement = (commentsData) => {
  const element = document.createElement('li');
  const img = document.createElement('img');
  const text = document.createElement('p');
  element.classList.add('social__comment');
  text.classList.add('social__text');
  text.textContent = commentsData.message;
  img.classList.add('social__picture');
  img.src = commentsData.avatar;
  img.width = '35';
  img.height = '35';
  img.alt = commentsData.name;
  element.append(img);
  element.append(text);
  return element;
};

const renderComents = (comments) => {
  comments.forEach ((comment) => {
    const createComment = createElement(comment);
    listCommentsElement.append(createComment);
    ofElement.textContent = `${listCommentsElement.children.length }`;
  });
};

const newRenderComments = (comments) => {
  const copyComments = comments.slice();
  listCommentsElement.innerHTML = '';
  const getNewComments = () => {
    addComments(copyComments);
  };
  commentsHandler = getNewComments;
  if(copyComments.length <= MAX_STEP_COMMENTS) {
    buttonLoadElement.classList.add('hidden');
    renderComents(copyComments);
  } else {
    buttonLoadElement.classList.remove('hidden');
    renderComents(copyComments.splice(0, MAX_STEP_COMMENTS));
    buttonLoadElement.addEventListener('click', commentsHandler);
  }
};

function addComments (copyComments) {
  if (copyComments.length <= MAX_STEP_COMMENTS) {
    buttonLoadElement.classList.add('hidden');
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
