import { showAlert } from './util.js';
const getData=async(onSuccess)=>{
  try{
    const response=await fetch('https://26.javascript.pages.academy/kekstagram/data');
    if(!response.ok){
      throw new Error('Не удалось загрузить изображение');
    }
    const offers=await response.json();
    onSuccess(offers);
  } catch(error){
    showAlert('Ошибка загрузки данных. Обновите страницу');
  }
};
const sendData = (onSuccess, onError, body) => {
  fetch('https://26.javascript.pages.academy/kekstagram', {
    method:'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onError('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export{getData,sendData};
