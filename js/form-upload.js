import { isEscapeKey, checkingMaxStrLength } from './util.js';
import { scaleControlValue, closeScaleControlValue, changeEffect, initEffects, effectList, pictureUploadPreviewElement } from './slider.js';
const uploadFile=document.querySelector('#upload-file');
const imgUploadOverlay=document.querySelector('.img-upload__overlay');
const bodyElement=document.querySelector('body');
const uploadCancel=document.querySelector('#upload-cancel');
const imgUploadForm=document.querySelector('.img-upload__form');
const hashTagsElement=document.querySelector('.text__hashtags');
const descriptionElement=document.querySelector('.text__description');
const MAX_HASHTAGS=5;
const MAX_SYMBOLS=140;


const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormEditImg();
  }
};


function openUploadImg () {
  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeFormEditImg () {
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.imgUploadForm.reset();
  document.removeEventListener('keydown', onPopupEscKeydown);
  closeScaleControlValue();

  effectList.removeEventListener('change', changeEffect);
  pictureUploadPreviewElement.removeAttribute('class');
  pictureUploadPreviewElement.removeAttribute('style');
}

uploadCancel.addEventListener('click',()=>{
  closeFormEditImg();
});

uploadFile.addEventListener('change', ()=>{
  openUploadImg();
  const sliderWrapper = document.querySelector('.effect-level');
  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  initEffects();
  scaleControlValue();
  effectList.addEventListener('change', changeEffect);
  sliderWrapper.classList.add('hidden');
});

//отменить обработчик Esc при фокусе
hashTagsElement.addEventListener('keydown', (evt) =>  {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});
descriptionElement.addEventListener('keydown', (evt) =>  {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

// Валидация хэштегов и комментариев
const pristine = new Pristine(imgUploadForm,{
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const hashtags = function(value) {value.toLowerCase().split(' ');
};

pristine.addValidator(hashTagsElement,(value)=>hashtags(value).length <= MAX_HASHTAGS,
  'нельзя указать больше пяти хэш-тегов');

function isHashtagValid (value) {
  const RegExp = /^#[A-Za-z0-9А-Яа-яЁё]{1,19}$/;
  const array = value.split(' ');
  for (const arrayElement of array) {
    if (!RegExp.test(arrayElement) && arrayElement !== '') {
      return false;
    }
  } return true;
}
pristine.addValidator(hashTagsElement,
  (value) => isHashtagValid(value),
  'хэш-тег начинается с символа # состоит из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.)'
);

pristine.addValidator(descriptionElement,
  (value) => checkingMaxStrLength(value, MAX_SYMBOLS),
  'длина комментария не больше 140 символов'
);

imgUploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (isValid) {
    evt.preventDefault();
  } });

