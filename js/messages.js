import { isEscapeKey } from './util.js';

const showMessageSuccess = ()=>{
  const messegeTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  const body = document.querySelector('body');

  const messegeElement = messegeTemplate.cloneNode(true);
  body.appendChild(messegeElement);

  const successButton = messegeElement.querySelector('.success__button');
  const successInner = messegeElement.querySelector('.success__inner');

  const onMessegeEscDown = () => {
    if(isEscapeKey){
      closeMessage();
    }
  };

  const onDocumentClickCansel = (evt) => {
    if(evt.target.closest('.success__inner') !== successInner){
      closeMessage();
    }
  };

  function closeMessage () {
    messegeElement.classList.add('hidden');
    successButton.removeEventListener('click', closeMessage);
    document.removeEventListener('keydown', onMessegeEscDown);
    document.removeEventListener('click', onDocumentClickCansel);
  }

  successButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onMessegeEscDown);
  document.addEventListener('click', onDocumentClickCansel);
};

const showMessageError = ()=>{
  const imgUpload = document.querySelector('.img-upload__overlay');
  const messegeTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  const body = document.querySelector('body');

  const messegeElement = messegeTemplate.cloneNode(true);
  body.appendChild(messegeElement);
  imgUpload.classList.add('hidden');

  const errorButton = messegeElement.querySelector('.error__button');
  const errorInner = messegeElement.querySelector('.error__inner');

  const onMessegeEscDown = () => {
    if(isEscapeKey){
      closeMessage();
    }
  };

  const onDocumentClickCansel = (evt) => {
    if(evt.target.closest('.error__inner') !== errorInner){
      closeMessage();
    }
  };

  function closeMessage () {
    messegeElement.classList.add('hidden');
    imgUpload.classList.remove('hidden');
    errorButton.removeEventListener('click', closeMessage);
    document.removeEventListener('keydown', onMessegeEscDown);
    document.removeEventListener('click', onDocumentClickCansel);
  }

  errorButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onMessegeEscDown);
  document.addEventListener('click', onDocumentClickCansel);

};
export{showMessageSuccess,showMessageError};
