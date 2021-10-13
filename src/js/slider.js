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
  } else {
    buttonLeft.disabled = true;
  }
  
  init();
});

buttonRight.addEventListener(`click`, () => {
  if (slideNumber < slides.length) {
    slideNumber++;
    buttonLeft.disabled = false;
  } else {
    buttonRight.disabled = true;
  }

  init();
});

init();