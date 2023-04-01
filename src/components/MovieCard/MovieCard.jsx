import React from 'react';
// import { useState } from 'react';
import { Card, Typography, Image, Space, Tag, Rate } from 'antd';
import { format } from 'date-fns';

import './MovieCard.css';

const { Meta } = Card;
const { Title, Text, Paragraph } = Typography;

const MovieCard = ({ poster_path, title, overview, vote_average, release_date, genre_ids, genres }) => {
  // const [ellipsis, setEllipsis] = useState(true);
  const desc = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const renderGenres = (genre, genresIdList) => {
    let existingGenres = [];
    if (genresIdList) {
      existingGenres = genresIdList.filter((item) => item.id === genre);
    }
    return existingGenres.map((item) => <Tag key={item.id}>{item.name}</Tag>);
  };

  return (
    <div className='card'>
      <Card
        hoverable
        // loading
        className='card-body'
      >
        <Meta
          className='card-meta'
          title={
            <>
              <Title level={4} className='card_title'>
                {title}
              </Title>
              <Text className='card-score' style={{ border: '2px solid #E9D100' }}>
                {Math.round(vote_average * 10) / 10}
              </Text>
            </>
          }
          description={
            <>
              <Text type='secondary' className='card-time'>
                {release_date && format(new Date(release_date), 'MMMM d, yyyy')}
              </Text>
              <Space size={[0, 8]} wrap>
                {genre_ids && genre_ids.map((genre) => renderGenres(genre, genres))}
              </Space>
              <Paragraph ellipsis={{ rows: 5 }} height={129} className='card-text'>
                {overview}
              </Paragraph>
              <Rate allowHalf defaultValue={2.5} count={10} tooltips={desc} style={{ fontSize: 16 }} />
            </>
          }
          avatar={
            <Image
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/original${poster_path}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
              }
              width={183}
              height={279}
            />
          }
        />
      </Card>
    </div>
  );
};

export default MovieCard;
