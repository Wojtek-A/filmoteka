import { pagination, loadPage } from './pagination';
import { fetchTheMovieDBList } from './api';
import { dataMovies } from './global';
import { loaderSpinner } from './loaderSpinner';
import { createMovies } from './gallery';
// import {
//   fetchUserDataFromFirestore,
//   addUserDataToFirestore,
//   fetchUserFilmData,
//   updateUserFilmData,
//   deleteUserFilmData,
//   userSigned,
// } from './firebase';

const startPage = async () => {
  dataMovies.fetchType = 'home';
  dataMovies.page = 1;
  dataMovies.query = null;
  loaderSpinner.classList.add('loader');
  // yours listeners no using start movies variable in function

  //
  const movies = await fetchTheMovieDBList(dataMovies.page, dataMovies.query);
  dataMovies.page = movies.page;
  dataMovies.totalPages = movies.total_pages;
  if (movies.total_pages > 0) {
    pagination();
  }
  loaderSpinner.classList.remove('loader');
  // function to creating gallery
  createMovies(movies);
  //

  loadPage();
  // yours listeners using start movies variable in function

  //
};

startPage();
