import { returnRandomInteger } from './util.js';
//Генерация временных данных
const DESCRIPTION=['Фото1','Фото2','Фото3','Фото4','Фото5','Фото6','Фото7','Фото8','Фото9','Фото10','Фото11','Фото12','Фото13','Фото14','Фото15','Фото16','Фото17','Фото18','Фото19','Фото20','Фото21','Фото22','Фото23','Фото24','Фото25'];
const MESSAGES=['Всё отлично! В целом всё неплохо. Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.','Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES=['Иван','Петр','Вася','Инна','Оля','Катя'];

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${returnRandomInteger(1, 6)}.svg`,
  message:MESSAGES[returnRandomInteger(0,MESSAGES.length-1)],
  name:NAMES[returnRandomInteger(0,NAMES.length-1)]
});

const createObject = (id) => {
  const comments = [];
  const commentsCount = returnRandomInteger(1,5);
  const ids = [];

  for (let i = 1; i <= commentsCount; i++) {
    if (i === 1) {
      const r = returnRandomInteger(1,100);
      comments.push(createComment(r));
      ids.push(r);
    }    else {
      let r;
      let isSame = true;
      while(isSame) {
        r = returnRandomInteger(1,100);
        if(!ids.some((el)=>el===r)){
          ids.push(r);
          isSame = false;
        }
      }
      comments.push(createComment(r));
    }
  }
  return {
    id,
    url: `photos/${id}.jpg`,
    description:DESCRIPTION[returnRandomInteger(0,DESCRIPTION.length-1)],
    likes:returnRandomInteger(15,200),
    comments
  };
};

const RAZ=25;
const generateObjects=[];
for (let i = 1; i <= RAZ; i++){
  generateObjects.push(createObject(i));
}
export{generateObjects};
