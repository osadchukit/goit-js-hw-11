import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

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

function createMarkup(data) {
  galleryRef.innerHTML = '';
  if (form[0].value === '') {
    Notiflix.Notify.info('Введіть слово.');
    return;
  } else if (data.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  const markup = data.hits.map(
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
  );

  galleryRef.innerHTML = markup.join('');

    new SimpleLightbox('.gallery a', {});

    console.log(data);
}
loadMore.disabled = true
console.log(loadMore);







loadMore.addEventListener('click', () => {
  if (page > data.totalPages) {
    return toggleAlertPopup();
  }

  fetchPosts()
    .then(posts => {
      renderPosts(posts);
      // Increase the group number
      page += 1;

      // Replace button text after first request
      if (page > 1) {
        fetchPostsBtn.textContent = 'Fetch more posts';
      }
    })
    .catch(error => console.log(error));
});

function fetchPosts() {
  const params = new URLSearchParams({
    _limit: limit,
    _page: page,
  });

  return fetch(`https://jsonplaceholder.typicode.com/posts?${params}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

function renderPosts(posts) {
  const markup = posts
    .map(({ id, title, body, userId }) => {
      return `<li>
          <h2 class="post-title">${title.slice(0, 30)}</h2>
          <p><b>Post id</b>: ${id}</p>
          <p><b>Author id</b>: ${userId}</p>
          <p class="post-body">${body}</p>
        </li>`;
    })
    .join('');
  userList.insertAdjacentHTML('beforeend', markup);
}








// -------------------------

// const fetchPostsBtn = document.querySelector('.btn');
// const userList = document.querySelector('.posts');
// const alertPopup = document.querySelector('.alert');
// let isAlertVisible = false;

// // Controls the group number
// let page = 1;
// // Controls the number of items in the group
// let limit = 5;
// // In our case total number of pages is calculated on frontend
// const totalPages = 100 / limit;

// fetchPostsBtn.addEventListener('click', () => {
//   // Check the end of the collection to display an alert
//   if (page > totalPages) {
//     return toggleAlertPopup();
//   }

//   fetchPosts()
//     .then(posts => {
//       renderPosts(posts);
//       // Increase the group number
//       page += 1;

//       // Replace button text after first request
//       if (page > 1) {
//         fetchPostsBtn.textContent = 'Fetch more posts';
//       }
//     })
//     .catch(error => console.log(error));
// });

// function fetchPosts() {
//   const params = new URLSearchParams({
//     _limit: limit,
//     _page: page,
//   });

//   return fetch(`https://jsonplaceholder.typicode.com/posts?${params}`).then(
//     response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     }
//   );
// }

// function renderPosts(posts) {
//   const markup = posts
//     .map(({ id, title, body, userId }) => {
//       return `<li>
//           <h2 class="post-title">${title.slice(0, 30)}</h2>
//           <p><b>Post id</b>: ${id}</p>
//           <p><b>Author id</b>: ${userId}</p>
//           <p class="post-body">${body}</p>
//         </li>`;
//     })
//     .join('');
//   userList.insertAdjacentHTML('beforeend', markup);
// }

// function toggleAlertPopup() {
//   if (isAlertVisible) {
//     return;
//   }
//   isAlertVisible = true;
//   alertPopup.classList.add('is-visible');
//   setTimeout(() => {
//     alertPopup.classList.remove('is-visible');
//     isAlertVisible = false;
//   }, 3000);
// }