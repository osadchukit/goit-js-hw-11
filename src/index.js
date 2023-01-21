import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import NewApiService from './js/fetch';

const form = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

const newApiService = new NewApiService();

form.addEventListener('submit', onSearch);
loadMore.addEventListener('click', loadMoreBtn)

function onSearch(event) {
  event.preventDefault();



  totalImg = 0;
  newApiService.query = event.currentTarget.searchQuery.value;
  newApiService.resetPage();
  newApiService.fetchArticles().then(hits => createMarkup(hits));
  galleryRef.innerHTML = '';

}

function loadMoreBtn() {
newApiService.fetchArticles().then(hits => createMarkup(hits));
}

let totalImg = 0

function createMarkup(obj) {
  console.dir(obj);
  let inputValue = form.searchQuery.value;
  totalImg += obj.hits.length;
  loadMore.classList.remove('visually-hidden');

 if (totalImg <= 40) Notiflix.Notify.info(`Знайдено фографій ${obj.total}`);

  if (inputValue === '') {
    loadMore.classList.add('visually-hidden');
    Notiflix.Notify.info('Введіть слово.');
    return;
  }


   else if (obj.hits.length === 0) {
      loadMore.classList.add('visually-hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return
    }

 else if (totalImg === obj.totalHits){
    loadMore.classList.add('visually-hidden');
        Notiflix.Notify.failure(
          `We're sorry, but you've reached the end of search results.`
    );
  }



  const markup = obj.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<a class="gallery__item" href="${webformatURL}">
    <div class="photo-card">
            <img class="item" src="${largeImageURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes:</b> ${likes}
          </p>
          <p class="info-item">
            <b>Views:</b> ${views}
          </p>
          <p class="info-item">
            <b>Comments:</b> ${comments}
          </p>
          <p class="info-item">
            <b>Downloads:</b> ${downloads}
          </p>
        </div>
      </div>
    </a>
      `
    )
    .join('');

  galleryRef.insertAdjacentHTML('beforeend', markup);

  new SimpleLightbox('.gallery a', {}).refresh();
}


