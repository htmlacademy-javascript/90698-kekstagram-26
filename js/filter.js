import { renderPictureList } from './small-picture.js';
import { returnRandomInteger } from './util.js';
import { debounce } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const MIN=-25;
const MAX=25;

const imgFiltersElement = document.querySelector('.img-filters');
const buttonDefaultElement = document.querySelector('#filter-default');
const buttonRandomElement = document.querySelector('#filter-random');
const buttonDiscussedElement = document.querySelector('#filter-discussed');

const removeAllPhotos = () => {
  const listPictureElements = document.querySelectorAll('.picture');
  listPictureElements.forEach((element) => {
    element.remove();
  });
};
const getRandomPhotos = () => returnRandomInteger(MIN, MAX);
const getDiscussedPhotos = (a, b) =>  b.comments.length - a.comments.length;
let currentActiveButton = document.querySelector('.img-filters__button--active');
const renderWithDelay = debounce(renderPictureList);
const showFilters = (data) => {
  imgFiltersElement.classList.remove('img-filters--inactive');
  const addFilter = (filterButton, sortFn) => {

    filterButton.addEventListener('click', () => {
      currentActiveButton.classList.remove('img-filters__button--active');
      filterButton.classList.add('img-filters__button--active');
      currentActiveButton = filterButton;
      removeAllPhotos();
      const filteredPhotos = sortFn();
      renderWithDelay(filteredPhotos);
    });
  };

  addFilter(buttonDefaultElement, () => data);
  addFilter(buttonRandomElement, () => data.slice().sort(getRandomPhotos).slice(0, RANDOM_PHOTOS_COUNT));

  addFilter(buttonDiscussedElement, () => data.slice().sort(getDiscussedPhotos));
};

export { showFilters };
