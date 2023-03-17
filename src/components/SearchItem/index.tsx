import React from 'react';
import {
  Container,
  ContainerMovie,
  Banner,
  InfoMovie,
  Title,
  RateContainer,
  Rate,
  Overview
} from './styles';

import {Ionicons} from '@expo/vector-icons';

function SearchItem({data, navigatePage}) {

  function detailMovie(){
    if(data.release_date === ''){
      alert('Unreleased movie or no expected release date!');
      return;
    }

    navigatePage(data);
  }

  return(
      <Container activeOpacity={0.7} onPress={detailMovie} >
          {data?.poster_path ? (
            <ContainerMovie>
            <Banner
              resizeMode="contain"
              source={{uri: `https://image.tmdb.org/t/p/original/${data?.poster_path}`}}
            />
            <InfoMovie>
            <Title numberOfLines={1}>{data?.title}</Title>
            <RateContainer>
            <Ionicons 
              name="md-star"
              size={12}
              color="#E7A74E"
            />
            <Rate>{data?.vote_average}/10</Rate>
          </RateContainer>
          {data?.overview ?(
            <Overview numberOfLines={9}>{data?.overview}</Overview>
          ) : (
            <Overview> -- No overview -- </Overview>
          )}
          
          </InfoMovie>
          </ContainerMovie>
          ) : (
            <Banner
              resizeMethod="resize"
              source={require('../../assets/semfoto.png')}
            />
          )}

      </Container>
  )
}

export default SearchItem;