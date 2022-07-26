const ALERT_SHOW_TIME=5000;

//Функция, возвращающая случайное целое число из переданного диапазона включительно
const returnRandomInteger = function (min, max) {
  if(min>=0 && max>=0 && min<max && min!==max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return -1;
};
returnRandomInteger(1,78);

//Функция для проверки максимальной длины строки
const checkingMaxStrLength = function (str, max) {
  return str.length<=max;
};
checkingMaxStrLength('Василий',456);


//Функция проверки нажатия клавиши Escape
const isEscapeKey = function(evt) {
  return evt.key === 'Escape';
};

//ошибка загрузки данных с сервера
const showAlert=(message)=>{
  const alert=document.createElement('div');
  alert.style.position='absolute';
  alert.style.zIndex='100';
  alert.style.left='0';
  alert.style.top='0';
  alert.style.right='0';
  alert.style.padding='10px 3px';
  alert.style.fontSize='30px';
  alert.style.textAlign='center';
  alert.style.backgroundColor='red';
  alert.textContent=message;
  document.body.append(alert);
  setTimeout(()=>{
    alert.remove();
  }, ALERT_SHOW_TIME);
};

export{isEscapeKey,returnRandomInteger,checkingMaxStrLength,showAlert};
/*const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
export{debounce};*/
