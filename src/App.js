import React, { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { Alert, message } from 'antd';
import { Offline, Online } from 'react-detect-offline';

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
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    service
      .getGenres()
      .then((res) => {
        setGenresList(res);
      })
      .catch((err) => errorMessage(err));
    setLoading(false);
  }, []);

  useEffect(() => {
    handleSubmit();
  }, [page]);

  const errorMessage = (error) => {
    messageApi.open({
      content: <Alert message={error.message} type='error' showIcon banner />,
      duration: 3,
    });
  };

  const handleChange = (event) => {
    setText(event.target.value);
    debounceHandleChange(event.target.value);
  };

  const handleSubmit = (text) => {
    setLoading(true);
    service
      .getData(text, page)
      .then((res) => {
        setLoading(false);
        setMovies(res.results);
        setSearchedData(res);
        if (!res.results.length) {
          throw new Error('Ничего не найдено');
        }
      })
      .catch((err) => {
        setError(err);
        errorMessage(err);
      });
  };

  const debounceHandleChange = useMemo(() => debounce(handleSubmit, 500), []);

  return (
    <>
      <Online>
        {contextHolder}
        <div className='page'>
          <main className='main'>
            <MovieTabs />
            <SearchLine text={text} handleChange={handleChange} handleSubmit={handleSubmit} />
            <ContentMovies movies={movies} genresList={genresList} loading={loading} error={error} />
          </main>
          <Footer setPage={setPage} searchedData={searchedData} />
        </div>
      </Online>
      <Offline>
        <Alert
          message='Отсутствует подключение к интернету!'
          description='Проверьте подключение к интернету и, возможно, к VPN'
          type='error'
          showIcon
        />
      </Offline>
    </>
  );
};

export default App;
