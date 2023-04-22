import React, { useContext, useState } from 'react';
import { Card, Typography, Image, Space, Tag, Rate } from 'antd';
import { format } from 'date-fns';

import './MovieCard.css';
import service from '../../service/service';
import { Genres } from '../../context';

const { Meta } = Card;
const { Title, Text, Paragraph } = Typography;

const MovieCard = ({ id, poster_path, title, overview, vote_average, release_date, genre_ids }) => {
  const desc = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [userRate, setUserRate] = useState(null);
  const genresContext = useContext(Genres);

  let borderCardScore = '';
  if (vote_average <= 3) {
    borderCardScore = '#E90000';
  } else if (vote_average <= 5) {
    borderCardScore = '#E97E00';
  } else if (vote_average <= 7) {
    borderCardScore = '#E9D100';
  } else {
    borderCardScore = '#66E900';
  }

  const renderGenres = (genre, genresIdList) => {
    let existingGenres = [];
    if (genresIdList) {
      existingGenres = genresIdList.filter((item) => item.id === genre);
    }
    return existingGenres.map((item) => <Tag key={item.id}>{item.name}</Tag>);
  };

  const rateMovie = async (id, rate) => {
    if (rate > 0) {
      const { guest_session_id } = JSON.parse(localStorage.getItem('guest_session'));
      await service.postRatedMovie(id, rate, guest_session_id);
    }
  };

  return (
    <div className='card'>
      <Card hoverable className='card-body'>
        <Meta
          className='card-meta'
          title={
            <>
              <Title level={4} className='card_title'>
                {title}
              </Title>
              <Text className='card-score' style={{ border: `2px solid ${borderCardScore}` }}>
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
                {genre_ids && genre_ids.map((genre) => renderGenres(genre, genresContext.genres))}
              </Space>
              <Paragraph ellipsis={{ rows: 5 }} height={129} className='card-text'>
                {overview}
              </Paragraph>
              <Rate
                allowHalf
                value={userRate}
                onChange={setUserRate}
                onClick={rateMovie(id, userRate)}
                count={10}
                tooltips={desc}
                style={{ fontSize: 16 }}
              />
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
