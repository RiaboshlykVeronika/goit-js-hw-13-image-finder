import './sass/main.scss';
import refs from './js/refs';
import cardMarkup from './templates/cardMarkup';

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
refs.list.addEventListener('click', onPictureClick);
window.addEventListener('scroll', trackScroll);

let page = 1;

function onFormSubmit(e) {
  e.preventDefault();
  const value = e.currentTarget.elements.query.value;
  if (!value) {
    refs.loadMoreBtn.classList.add('is-hidden');
    return refs.list.innerHTML='';
  }
  const BASE_URL = 'https://pixabay.com/api/';
  const queryParam = new URLSearchParams({
    key: '24217102-48efb1ba7adb3c7af107ff1cd',
    image_type: 'photo',
    q: value,
    orientation: 'horizontal',
    per_page: 12,
  });

  fetch(`${BASE_URL}?${queryParam}&page=${page}`)
    .then(res => res.json())
    .then(data => {
      renderCard(data);
      refs.loadMoreBtn.classList.remove('is-hidden');
    });

  function renderCard({ hits }) {
    refs.list.innerHTML = cardMarkup(hits);
  }
}

function incrementPage () {
  page += 1;
};

function onLoadMoreBtnClick() {
  incrementPage();
  const BASE_URL = 'https://pixabay.com/api/';
  const queryParam = new URLSearchParams({
    key: '23292675-06f406722274daa99671b1028',
    image_type: 'photo',
    q: refs.form.elements.query.value,
    orientation: 'horizontal',
    page: 1,
    per_page: 12,
  });

  fetch(`${BASE_URL}?${queryParam}&page=${page}`)
    .then(res => res.json())
    .then(data => {
      renderCard(data);
      refs.loadMoreBtn.classList.remove('is-hidden');
      handleButtonClick();
    });

  function renderCard({ hits }) {
    const markup = cardMarkup(hits);
    refs.list.insertAdjacentHTML('beforeend', markup);
      
  }
}

const hiddenElement = refs.loadMoreBtn;
const btn = refs.formBtn;

function handleButtonClick() {
  hiddenElement.scrollIntoView({  behavior: 'smooth', block: 'end'});
}

function onPictureClick(e) {
  if (!e.target.classList.contains('card-img')) {
    return;
  }
  
  const instance = basicLightbox.create(`
    <img src="${e.target.dataset.largeImg}" width="800" height="600">
  `);
  instance.show();
}

function trackScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;
}

