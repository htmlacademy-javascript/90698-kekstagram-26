import { isEscapeKey, checkingMaxStrLength } from './util.js';
import { scaleControlValue, closeScaleControlValue, changeEffect, initEffects, effectList, pictureUploadPreviewElement } from './slider.js';
import { sendData } from './api.js';
import { showAlert } from './util.js';
import{showMessageSuccess,showMessageError} from './messages.js';

const MAX_HASHTAGS=5;
const MAX_SYMBOLS=140;

const imgUploadForm=document.querySelector('.img-upload__form');
const uploadFile=imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay=imgUploadForm.querySelector('.img-upload__overlay');
const bodyElement=document.querySelector('body');
const uploadCancel=imgUploadForm.querySelector('#upload-cancel');
const hashTagsElement=imgUploadForm.querySelector('.text__hashtags');
const descriptionElement=imgUploadForm.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

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

  effectList.removeEventListener('change', changeEffect);
  pictureUploadPreviewElement.removeAttribute('class');
  pictureUploadPreviewElement.removeAttribute('style');
  closeScaleControlValue();
  imgUploadForm.reset();
  document.removeEventListener('keydown', onPopupEscKeydown);
}

uploadCancel.addEventListener('click',()=>{
  closeFormEditImg();
});

uploadFile.addEventListener('change', ()=>{
  openUploadImg();
  const sliderWrapper = document.querySelector('.effect-level');
  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
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

initEffects();

// Валидация хэштегов и комментариев
const pristine = new Pristine(imgUploadForm,{
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const isMaxHashtags = (value)=>value.split(' ').length<= MAX_HASHTAGS;

pristine.addValidator(hashTagsElement,isMaxHashtags,
  'нельзя указать больше пяти хэш-тегов');

const isTheOnlyOne = (value) => {
  const newHashtags = value.toLowerCase().split(' ');
  return newHashtags.every((newHashtag) => newHashtags.filter((tag) => tag === newHashtag).length === 1);
};
pristine.addValidator(
  hashTagsElement,
  isTheOnlyOne,
  'Два одинаковых хэш-тега!',
);

const validateHashLength = function (value) {
  if (value === '') {
    return true;
  }
  return value.split(' ').every((element) => element.length <= 20 && element.length >= 2);
};
pristine.addValidator(hashTagsElement,
  validateHashLength,
  'Длина хэш-тега должна быть от 2 до 20 символов');

const validateHashRegular=function(value){
  if (value === '') {
    return true;
  }
  return value.split(' ').every((element) => /^#[A-Za-zА-Яа-яЁё0-9]{0,}$/.test(element));
};

pristine.addValidator(hashTagsElement,validateHashRegular,
  'Хештег начинается с # состоит из букв и чисел');

pristine.addValidator(descriptionElement,
  (value) => checkingMaxStrLength(value, MAX_SYMBOLS),
  'длина комментария не больше 140 символов'
);

const onSuccess = () => {
  closeFormEditImg();
  unblockSubmitButton();
  showMessageSuccess();

};
const onError = () => {
  showAlert('Не удалось отправить форму. Попробуйте ещё раз');
  unblockSubmitButton();
  showMessageError();
};

const setFileFormSubmit = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
        },
        () => {
          onError();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setFileFormSubmit, closeFormEditImg};

