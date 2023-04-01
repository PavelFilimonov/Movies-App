import React from 'react';
import { Input } from 'antd';

import './SearchLine.css';

const SearchLine = ({ text, handleChange }) => {
  return (
    <div className='search-line'>
      <Input placeholder='Type to search...' value={text} onChange={handleChange} />
    </div>
  );
};

export default SearchLine;
