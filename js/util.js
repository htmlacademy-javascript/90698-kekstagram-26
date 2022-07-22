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
export{isEscapeKey,returnRandomInteger,checkingMaxStrLength};
