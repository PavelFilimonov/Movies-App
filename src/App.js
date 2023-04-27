import React, { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { Tabs, Alert, message } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import './index.css';

import SearchLine from './components/SearchLine';
import ContentMovies from './components/ContentMovies';
import Footer from './components/Footer';
import service from './service/service';
import { Genres } from './context';

const App = () => {
  const [text, setText] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchedData, setSearchedData] = useState({});
  const [genresList, setGenresList] = useState({});
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [error, setError] = useState(null);
  const [ratedMovies, setRatedMovies] = useState([]);

  useEffect(() => {
    setLoading(true);
    service
      .getGenres()
      .then((res) => {
        setGenresList(res);
      })
      .catch((err) => errorMessage(err));
    service.createGuestSession();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (text && page) {
      handleSubmit();
    }
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
    if (text) {
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
    }
  };

  const debounceHandleChange = useMemo(() => debounce(handleSubmit, 500), []);

  const ratedListMovies = () => {
    setLoading(true);
    service
      .getRatedMovies()
      .then((res) => {
        setLoading(false);
        setRatedMovies(res.results);
        setSearchedData(res);
        if (!res.results.length) {
          throw new Error('Вы ничего не оценили');
        }
      })
      .catch((err) => {
        setError(err);
        errorMessage(err);
      });
  };

  const activeTab = (event) => {
    if (event === '1') {
      handleSubmit();
    }
    if (event === '2') {
      ratedListMovies();
    }
  };

  const items = [
    {
      key: '1',
      label: 'Search',
      children: (
        <>
          <main className='main'>
            <SearchLine text={text} handleChange={handleChange} handleSubmit={handleSubmit} />
            <ContentMovies movies={movies} loading={loading} error={error} />
          </main>
          <Footer setPage={setPage} searchedData={searchedData} />
        </>
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: (
        <>
          <main className='main'>
            <ContentMovies movies={ratedMovies} loading={loading} error={error} />
          </main>
          <Footer setPage={setPage} searchedData={searchedData} />
        </>
      ),
    },
  ];

  return (
    <>
      <Online>
        <Genres.Provider value={genresList}>
          {contextHolder}
          <div className='page'>
            <Tabs centered defaultActiveKey='1' items={items} onChange={activeTab} />
          </div>
        </Genres.Provider>
      </Online>
      <Offline>
        <Alert message='Отсутствует подключение к интернету!' type='error' showIcon />
      </Offline>
    </>
  );
};

export default App;
