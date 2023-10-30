let currentPage = 1;
let searchQuery;  
import { performSearch } from './api';



function nextPage() {
  currentPage += 1;
  performSearch(searchQuery, currentPage);
}

function resetPagination() {
  currentPage = 1;
}

export { nextPage, resetPagination, currentPage, searchQuery };

 
export function setSearchQuery(query) {
  searchQuery = query;
}