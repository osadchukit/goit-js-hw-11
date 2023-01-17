import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');

form.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
    const { searchQuery } = event.currentTarget;
    pixelApi(searchQuery.value)
      .then(data => createMarkup(data))
      .catch(err => console.log(err));
}

async function pixelApi(searchQuery) {
    const BASE_URL = 'https://pixabay.com/api';
    const key = '32829477-2f7edc8ed39a847f6da0b1679';
    const per_page = 40;
    const image_type = 'photo';
    const orientation = 'horizontal';
    const safesearch = true;

    const resp = await fetch(
        `${BASE_URL}/?key=${key}&q=${searchQuery}&per_page=${per_page}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}`
    );
    if (!resp.ok) {
        throw new Error(resp.statusText);
    }
    return await resp.json();
}

function createMarkup({ hits }) {
    galleryRef.innerHTML = '';
  console.log(hits);
  if (form[0].value === '') {
    Notiflix.Notify.info(
      'Введіть слово.'
    );
    return;
  } else if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

  const markup = hits.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => `<div class="photo-card">
        <a class="gallery__item" href="${webformatURL}">
            <img class="item" src="${largeImageURL}" alt="${tags}" loading="lazy" />
        </a>
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
      `
  );

  galleryRef.innerHTML = markup.join('');
}


new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: true,
  scrollZoomFactor: 0.5,
});