document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.stage').scrollIntoView();
  const picture = document.querySelector('.content__img');
  const background = document.querySelector('.header');
  const keyValue = 768;
  window.onresize = () => {
    if (window.innerWidth <= keyValue && window.innerWidth > 519) {
      picture.style.left = `-${keyValue - window.innerWidth}px`;
    }
    if (window.innerWidth <= keyValue && window.innerWidth > 319) {
      background.style.height = `${window.innerWidth * 0.84395}px`;
    }
    if (keyValue < window.innerWidth) {
      background.style.height = '';
      picture.style.left = '';
    }
  };
});
