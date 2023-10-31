import axios from 'axios';
import Notiflix from 'notiflix'; 
import { displayResults } from './index';
import { nextPage, currentPage } from './pagination.js';


const BASE_URL = 'https://pixabay.com/api/';
const BASE_KEY = '40349433-607a0eca23d92c4a115fc3307';
const loadMoreButton = document.querySelector('.load-more');

let maxPage = 1;
import { searchQuery } from './index';

export async function performSearch() {
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
    
  } catch (error) {
    console.error('Mistake', error);
  }
}


loadMoreButton.addEventListener('click', async () => {

  nextPage();
  await performSearch();


    if (currentPage === maxPage) {
      loadMoreButton.style.display = 'none';
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');

    }
});



  


  