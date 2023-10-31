const searchInput = document.querySelector('.search-form input');
const searchForm = document.querySelector('.search-form');
const imageContainer = document.querySelector('.gallery');

import { resetPagination} from './pagination.js';

import { performSearch } from './api';
import { setSearchQuery } from './pagination';


searchForm.addEventListener('submit', function (event) {
    event.preventDefault();  
    const searchQuery = searchInput.value;
    setSearchQuery(searchQuery); 
    performSearch(searchQuery);

    searchInput.value = '';
    resetPagination();
  });

  export function displayResults(results) {
    imageContainer.innerHTML = ''; 
  
    const photoCardsHTML = results.map((result) => {
      return `
        <div class="photo-card">
          <img src="${result.webformatURL}" alt="${result.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes:</b> ${result.likes}</p>
            <p class="info-item"><b>Views:</b> ${result.views}</p>
            <p class="info-item"><b>Comments:</b> ${result.comments}</p>
            <p class="info-item"><b>Downloads:</b> ${result.downloads}</p>
          </div>
        </div>
      `;
    }).join('');
  
    imageContainer.innerHTML = photoCardsHTML;
    // imageContainer.insertAdjacentHTML('beforeend', photoCardsHTML);

  }


 
