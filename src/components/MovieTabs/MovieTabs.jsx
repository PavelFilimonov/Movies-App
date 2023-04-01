import React from 'react';
import { Tabs } from 'antd';

import './MovieTabs.css';

const MovieTabs = () => {
  const items = [
    {
      key: '1',
      label: 'Search',
      children: '',
    },
    {
      key: '2',
      label: 'Rated',
      children: '',
    },
  ];

  return (
    <div className='movie-tabs'>
      <Tabs defaultActiveKey='1' items={items} onChange={() => {}} />
    </div>
  );
};

export default MovieTabs;
