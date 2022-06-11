//Функция, возвращающая случайное целое число из переданного диапазона включительно
const returnRandomInteger = function (min, max) {
    min=Math.ceil(min);
    max=Math.floor(max);
    const rez = Math.floor(Math.random() * (max - min + 1)) + min;
    if(min>0) {return `${ rez } целое число из диапазона от ${ min } до ${ max }`;}
  else {return('Упс, число не может быть меньше или равно 0');}
  };
returnRandomInteger(1,78)

  //Функция для проверки максимальной длины строки
  const checkingMaxStrLength = function (str, max) {
    if(str.length<=max){
      return('true');}
    else {
      return('false');}
  };
       checkingMaxStrLength('Василий',456)