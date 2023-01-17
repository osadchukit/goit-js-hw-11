import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const submitRef = document.querySelector('.search-form button');
const galleryRef = document.querySelector('.gallery');

form.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
    const { searchQuery } = event.currentTarget;
    pixelApi(searchQuery.value)
      .then(data => createMarkup(data))
      .catch(err => console.log(err));
}

function pixelApi(searchQuery) {
  const BASE_URL = 'https://pixabay.com/api';
    const key = '32829477-2f7edc8ed39a847f6da0b1679';
    return fetch(`${BASE_URL}/?key=${key}&q=${searchQuery}`)
        .then(resp => {
            // console.log(resp)
            if (!resp.ok) {
            throw new Error(resp.statusText)
            }
            
            return resp.json()
        })
}

function createMarkup(obj) {
    console.log(obj);
}

    //   <div class="photo-card">
    //     <img width="300px" src="" alt="" loading="lazy" />
    //     <div class="info">
    //       <p class="info-item">
    //         <b>Likes</b>
    //       </p>
    //       <p class="info-item">
    //         <b>Views</b>
    //       </p>
    //       <p class="info-item">
    //         <b>Comments</b>
    //       </p>
    //       <p class="info-item">
    //         <b>Downloads</b>
    //       </p>
    //     </div>
    //   </div>;







// 
// const fetchUsersBtn = document.querySelector('.btn');
// const userList = document.querySelector('.user-list');

// fetchUsersBtn.addEventListener('click', async () => {
//   try {
//       const users = await
//         fetchUsers();
//         renderUserListItems(users);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// async function fetchUsers() {
//   const baseUrl =
//     'https://pixabay.com/api/?key=32829477-2f7edc8ed39a847f6da0b1679&q=yellow+flowers&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
// //   const userIds = [1, 2, 3, 4, 5];

//   const arrayOfPromises = userIds.map(async userId => {
//     const response = await fetch(`${baseUrl}`);
//     return response.json();
//   });

//   const users = await Promise.all(arrayOfPromises);
//   return users;
// }

// function renderUserListItems(users) {
//   const markup = users
//     .map(
//       user => `<li class="item">
//         <p><b>Name</b>: ${user.name}</p>
//         <p><b>Email</b>: ${user.email}</p>
//         <p><b>Company</b>: ${user.company.name}</p>
//       </li>`
//     )
//     .join('');
//   userList.innerHTML = markup;
// }



    //   <div class="photo-card">
    //     <img width="300px" src="" alt="" loading="lazy" />
    //     <div class="info">
    //       <p class="info-item">
    //         <b>Likes</b>
    //       </p>
    //       <p class="info-item">
    //         <b>Views</b>
    //       </p>
    //       <p class="info-item">
    //         <b>Comments</b>
    //       </p>
    //       <p class="info-item">
    //         <b>Downloads</b>
    //       </p>
    //     </div>
    //   </div>;