// Slider

const slider = document.querySelector(`.slider`);
const slides = slider.querySelectorAll(`.slide`);
const buttonLeft = slider.querySelector(`.slider__toggle--left`);
const buttonRight = slider.querySelector(`.slider__toggle--right`);
const slideNumberElement = slider.querySelector(`.slider__number`);

let slideNumber = 1;

const init = () => {
  slider.className = `header__wrapper slider`;
  slides.forEach((slide) => {
    slide.className = `slider__item slide`;
  });

  slider.classList.add(`slider--${slideNumber}`);
  slides[slideNumber -1].classList.add(`slide--current`);
  slideNumberElement.innerHTML = `0${slideNumber}&ensp;&mdash;&ensp;<span>0${slides.length}</span>`
}


buttonLeft.addEventListener(`click`, () => {
  if (slideNumber > 1) {
    slideNumber--;
    buttonRight.disabled = false;
  } 

  if (slideNumber === 1) {
    buttonLeft.disabled = true;
  }

  init();
});

buttonRight.addEventListener(`click`, () => {
  if (slideNumber < slides.length) {
    slideNumber++;
    buttonLeft.disabled = false;
  } 

  if (slideNumber === slides.length) {
    buttonRight.disabled = true;
  }

  init();
});

init();


// Accordion

const servicesItems = document.querySelectorAll(`.services__item`);

servicesItems.forEach((item) => {
  item.addEventListener(`click`, () => {
    item.classList.toggle(`services__item--open`);
  });
});

// Quantity

const quantityValue = document.querySelector(`.quantity__control--value`);
const quantityDecrease = document.querySelector(`.quantity__control--decrease`);
const quantityIncrease = document.querySelector(`.quantity__control--increase`);

let value = 1;

quantityValue.defaultValue = value;

quantityDecrease.addEventListener(`click`, () => {
  if (value < 1) {
    return;
  }
  value--;
  quantityValue.defaultValue = value;
});

quantityIncrease.addEventListener(`click`, () => {
  value++;
  quantityValue.defaultValue = value;
});

