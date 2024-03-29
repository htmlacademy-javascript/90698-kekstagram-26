const STEP_VALUE_SCALE = 25;
const MIN_VALUE_SCALE = 25;
const MAX_VALUE_SCALE = 100;
const DIVISOR=100;

const imgUploadOverlay=document.querySelector('.img-upload__overlay');
const scaleSmallerElement = imgUploadOverlay.querySelector('.scale__control--smaller');
const scaleBiggerElement = imgUploadOverlay.querySelector('.scale__control--bigger');
const scaleControlValueElement = imgUploadOverlay.querySelector('.scale__control--value');
const pictureUploadPreviewElement = imgUploadOverlay.querySelector('.img-upload__preview img');
let currentValue;

const effectLevelElement = imgUploadOverlay.querySelector('.effect-level');
const sliderElement = imgUploadOverlay.querySelector('.effect-level__slider');
const effectValueInputElement = imgUploadOverlay.querySelector('.effect-level__value');
const effectList = imgUploadOverlay.querySelector('.effects__list');

//Изменение размера картинки
function scalePicture () {
  scaleControlValueElement.value = `${currentValue}%`;
  pictureUploadPreviewElement.style.transform = `scale(${currentValue / DIVISOR})`;
}

function scaleSmaller () {
  if (currentValue > MIN_VALUE_SCALE) {
    currentValue -= STEP_VALUE_SCALE;
  }
  scalePicture();
}

function scaleBigger () {
  if (currentValue < MAX_VALUE_SCALE) {
    currentValue += STEP_VALUE_SCALE;
  }
  scalePicture();
}

function scaleControlValue () {
  currentValue = MAX_VALUE_SCALE;
  scaleControlValueElement.value = `${MAX_VALUE_SCALE}%`;
  pictureUploadPreviewElement.style.transform = `scale(${1})`;
  scaleSmallerElement.addEventListener('click', scaleSmaller);
  scaleBiggerElement.addEventListener('click', scaleBigger);
}

function closeScaleControlValue () {
  scaleSmallerElement.removeEventListener('click', scaleSmaller);
  scaleBiggerElement.removeEventListener('click', scaleBigger);
}

//наложение эффектов
const EFFECTS = {
  chrome: {
    filter: 'grayscale',
    units: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    }
  },
  sepia: {
    filter: 'sepia',
    units: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    }
  },
  marvin: {
    filter: 'invert',
    units: '%',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    }
  },
  phobos: {
    filter: 'blur',
    units: 'px',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    }
  },
  heat: {
    filter: 'brightness',
    units: '',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    }
  },
};


const initEffects = ()=> {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    },
  });
};

function changeEffect (evt) {
  const evtHandler = evt.target.value;
  if (evtHandler === ' ') {
    effectLevelElement.classList.add('hidden');
    pictureUploadPreviewElement.style.filter = ' ';
    effectLevelElement.noUiSlider.off();
  }  else {
    effectLevelElement.classList.remove('hidden');
    pictureUploadPreviewElement.removeAttribute('class');
    pictureUploadPreviewElement.classList.add(`effects__preview--${evtHandler}`);
    sliderElement.noUiSlider.updateOptions(EFFECTS[evtHandler].options);
    sliderElement.noUiSlider.on('update', () => {
      effectValueInputElement.value = sliderElement.noUiSlider.get();
      pictureUploadPreviewElement.style.filter = `${EFFECTS[evtHandler].filter}(${effectValueInputElement.value}${EFFECTS[evtHandler].units})`;
    });
  }
}
export{scaleControlValue, closeScaleControlValue, changeEffect, initEffects, effectList, pictureUploadPreviewElement};
