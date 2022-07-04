import {generateObjects} from './data.js';
const pictureList=document.querySelector('.pictures');
const pictureTemplate=document.querySelector('#picture').content.querySelector('.picture');
const fragment=document.createDocumentFragment();

generateObjects.forEach(({url,likes,comments})=>{
  const pictureElement=pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src=url;
  pictureElement.querySelector('.picture__likes').textContent=likes;
  pictureElement.querySelector('.picture__comments').textContent=comments.length;
  fragment.appendChild(pictureElement);
});
pictureList.appendChild(fragment);


