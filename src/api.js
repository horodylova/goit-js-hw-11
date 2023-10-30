// import axios from 'axios';
// import Notiflix from 'notiflix'; 
// import { displayResults } from './index';
// import { nextPage, currentPage } from './pagination.js';


const BASE_URL = 'https://pixabay.com/api/';
const BASE_KEY = '40349433-607a0eca23d92c4a115fc3307';
const loadMoreButton = document.querySelector('.load-more');

let maxPage;


export async function performSearch(searchQuery) {
   try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: BASE_KEY,
          q: searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          per_page: 40, 
          page: currentPage,
        },
      });
  
      if (response.status === 200) {
      
      const data = response.data;
  
        if (data.hits.length === 0) {
          Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } 
        else {
         
          displayResults(data.hits);
        }

        const totalHits = data.totalHits;
        const perPage = 40;
        maxPage = Math.ceil(totalHits / perPage);

         if (currentPage >= maxPage) {
        loadMoreButton.style.display = 'none';
      } else {
        loadMoreButton.style.display = 'block';
      }
    } else {
      console.error('Mistake', response.status);
    }
  } catch (error) {
    console.error('Mistake', error);
  }
}

loadMoreButton.addEventListener('click', () => {
  if (currentPage < maxPage) {
    nextPage();
  } else {
    loadMoreButton.style.display = 'none';
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
});

  