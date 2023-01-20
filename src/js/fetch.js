const BASE_URL = 'https://pixabay.com/api';
const key = '32829477-2f7edc8ed39a847f6da0b1679';
const per_page = 40;
const image_type = 'photo';
const orientation = 'horizontal';
const safesearch = true;

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchArticles() {
    const res = await fetch(
          `${BASE_URL}/?key=${key}&q=${this.searchQuery}&per_page=${per_page}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&page=${this.page}`
      );
      const obj = await res.json();
      this.incrementPage();
      return obj;
  }

    
    
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
    }
    
    
}

// export async function pixelApi(searchQuery) {
//     const BASE_URL = 'https://pixabay.com/api';
//     const key = '32829477-2f7edc8ed39a847f6da0b1679';
//     const per_page = 40;
//     const image_type = 'photo';
//     const orientation = 'horizontal';
//     const safesearch = true;
//     // const page = 1

//     const resp = await fetch(
//         `${BASE_URL}/?key=${key}&q=${searchQuery}&per_page=${per_page}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}`);

//     if (!resp.ok) {
//         throw new Error(resp.statusText);
//     }
//     return await resp.json();
// }
