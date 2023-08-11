import axios from 'axios';
const form = document.querySelector('.search-form');
const inpute = document.querySelector('[name="searchQuery"]');
const submitButton = document.querySelector('[type="submit"]');
const gallery = document.querySelector('.gallery');
let array = [];
//
//
//
//
//
//
const MAIN_URL = 'https://pixabay.com/api/';
const API_KEY = '38759560-76db7c61ea024fe4bd5e7b79d';
//
//
//
//
//
//
let inputeValue = '';
let obj = {};
form.addEventListener('submit', showImage);
function showImage(event) {
  event.preventDefault();
  inputeValue = event.currentTarget.firstElementChild.value;

  makeCards(throwPromise(inputeValue));
}
//
//
//
//
//
//
//
async function throwPromise(name) {
  return await axios
    .get(
      `${MAIN_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .then(resolve => {
      if (resolve.data.hits.length === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      return resolve.data;
    })
    .catch(er => console.error(er));
}
//
//
//
//
//
//
//
//
function makeCards(promise) {
  promise.then(resolve => {
    array = resolve.hits.map(a => {
      return `<div class="photo-card" id="${a.id}" largeImageURL="${a.largeImageURL}">
      <img src="${a.webformatURL}" alt="${a.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes${a.likes}</b>
        </p>
        <p class="info-item">
          <b>Views${a.views}</b>
        </p>
        <p class="info-item">
          <b>Comments${a.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads${a.downloads}</b>
        </p>
      </div>
    </div>`;
    });
    gallery.insertAdjacentHTML('beforeend', array.join(''));
  });
}
