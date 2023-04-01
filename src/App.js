import React, { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

import './index.css';

import MovieTabs from './components/MovieTabs';
import SearchLine from './components/SearchLine';
import ContentMovies from './components/ContentMovies';
import Footer from './components/Footer';
import service from './service/service';

const App = () => {
  const [text, setText] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchedData, setSearchedData] = useState({});
  const [genresList, setGenresList] = useState({});

  useEffect(() => {
    service
      .getGenres()
      .then((res) => {
        setGenresList(res);
      })
      .catch((error) => error);
  }, []);

  useEffect(() => {
    handleSubmit();
  }, [page]);

  const handleChange = (event) => {
    setText(event.target.value);
    debounceHandleChange(event.target.value);
  };

  const handleSubmit = (text) => {
    service
      .getData(text, page)
      .then((res) => {
        setMovies(res.results);
        setSearchedData(res);
        if (!res.results.length) {
          throw new Error('Ничего не найдено');
        }
      })
      .catch((error) => error);
  };

  const debounceHandleChange = useMemo(() => debounce(handleSubmit, 500), []);

  return (
    <div className='page'>
      <main className='main'>
        <MovieTabs />
        <SearchLine text={text} handleChange={handleChange} handleSubmit={handleSubmit} />
        <ContentMovies movies={movies} genresList={genresList} />
      </main>
      <Footer setPage={setPage} searchedData={searchedData} />
    </div>
  );
};

export default App;
