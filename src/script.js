import axios from 'axios';
import Notiflix from 'notiflix';
const form = document.querySelector('.search-form');
const inpute = document.querySelector('[ name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
let pageNumber = 1;
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
//
form.addEventListener('submit', showImage);

function showImage(event) {
  pageNumber = 1;
  gallery.innerHTML = '';
  event.preventDefault();

  makeCards(throwPromise(inpute.value, pageNumber));
}
//
//
//
//
//
//
//
//
loadMore.addEventListener('click', () => {
  pageNumber += 1;
  makeCards(throwPromise(inpute.value, pageNumber));
});

//
//
//
//
//
//
//
async function throwPromise(name, page) {
  return await axios
    .get(
      `${MAIN_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    )
    .then(resolve => {
      if (resolve.data.hits.length === 0) {
        Notiflix.Notify.failure(
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
//
function makeCards(promise) {
  promise.then(resolve => {
    array = resolve.hits.map(a => {
      return `<div class="photo-card" id="${a.id}" largeImageURL="${a.largeImageURL}">
      <img src="${a.webformatURL}" alt="${a.tags}" loading="lazy" width=300/>
      <div class="info">
        <p class="info-item">
          <b>Likes<br>${a.likes}</b>
        </p>
        <p class="info-item">
          <b>Views<br>${a.views}</b>
        </p>
        <p class="info-item">
          <b>Comments<br>${a.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads<br>${a.downloads}</b>
        </p>
      </div>
    </div>`;
    });
    gallery.insertAdjacentHTML('beforeend', array.join(''));
    loadMore.classList.remove('hidden');

    if (gallery.childElementCount > resolve.totalHits) {
      loadMore.classList.add('hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    } else if (resolve.totalHits == 0) {
      loadMore.classList.add('hidden');
    }
  });
}
