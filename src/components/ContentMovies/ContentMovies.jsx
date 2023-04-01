import React from 'react';
import { Layout } from 'antd';

import './ContentMovies.css';

import MovieCard from './../MovieCard';

const { Content } = Layout;

const ContentMovies = ({ movies, genresList }) => {
  return (
    <Content className='content-movie'>
      {movies.map((movie) => (
        <MovieCard key={movie.id} {...movie} {...genresList} />
      ))}
    </Content>
  );
};

export default ContentMovies;
