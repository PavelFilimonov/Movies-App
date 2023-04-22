import React from 'react';
import { Layout, Alert, Spin } from 'antd';

import './ContentMovies.css';

import MovieCard from './../MovieCard';

const { Content } = Layout;

const ContentMovies = ({ movies, loading, error }) => {
  return (
    <Content className='content-movie'>
      {error && <Alert message={error.message} type='error' showIcon />}
      {loading && <Spin tip='Loading' size='large' spinning={loading} />}
      {!loading && movies && movies.map((movie) => <MovieCard key={movie.id} {...movie} />)}
    </Content>
  );
};

export default ContentMovies;
