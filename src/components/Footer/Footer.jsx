import React from 'react';
import { Pagination } from 'antd';

import './Footer.css';

const Footer = ({ setPage, searchedData }) => {
  return (
    <footer className='footer'>
      <Pagination
        defaultCurrent={1}
        current={searchedData.page}
        onChange={setPage}
        total={searchedData.total_results}
        pageSize={20}
        hideOnSinglePage={true}
      />
    </footer>
  );
};

export default Footer;
