import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView, Modal, ActivityIndicator} from 'react-native';

import { 
  Container,
  Header,
  HeaderButton,
  Banner,
  ButtonLink,
  Title,
  ContentArea,
  Rate,
  ListGenres,
  Overview,
  SliderMovies,
  PlayerContainer,
} from './styles';

import {Feather, Ionicons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';

import {useNavigation, useRoute} from '@react-navigation/native';
import api, {key} from '../../services/api';

import Stars from 'react-native-stars';
import YoutubePlayer from "react-native-youtube-iframe";

import Genres from '../../components/Genres';
import ModalLink from '../../components/ModalLink';
import SliderItem from '../../components/SliderItem';

import {saveMovies, hasMovie, deleteMovie} from '../../utils/storage';
import {getListMovies} from '../../utils/movie';

function Details(item) {

  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState({});
  const [providers, setProviders] = useState({});
  const [openLink, setOpenLink] = useState(false);
  const [favoritedMovie, setFavoritedMovie] = useState(false);
  const [playing, setPlaying] = useState(true)
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getMovies(){
      const [detailMovie, trailerMovie, similarsMovie] = await Promise.all([
        api.get(`/movie/${route.params?.id}`, {
            params:{
              api_key: key,
            }
        }),
        api.get(`/movie/${route.params?.id}/videos`, {
          params:{
            api_key: key,
            language: 'en',
            page: 1,
          }
        }),
        api.get(`/movie/${route.params?.id}/similar`, {
          params:{
            api_key: key,
            page: 1,
          }
        }),
      ])

      if(isActive){

        setMovie(detailMovie.data);
        const isFavorite = await hasMovie(detailMovie.data);
        setFavoritedMovie(isFavorite);

        const [test] = trailerMovie.data.results;
        const teste2 = test;
        if (teste2.key !== ''){
          setProviders(teste2.key);
        } else {
          setProviders(false)
        }

        const similar = getListMovies(10, similarsMovie.data.results);
        setSimilarMovies(similar);

        setLoading(false);
      }
    }

    getMovies();

    return () => {
      isActive = false;
      ac.abort();
    }
  }, []);

  async function handleFavoriteMovie(movie) {

    if(favoritedMovie){
      await deleteMovie(movie.id);
      setFavoritedMovie(false);
    }else{
      await saveMovies('@primecine', movie);
      setFavoritedMovie(true);
    }
    
  }

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  function navigateDetailsPage(item){
    navigation.navigate('Details', {
      id: item.id
    })
  }

  if(loading){
    return(
      <Container style={{alignItems: "center", justifyContent: "center"}}>
        <ActivityIndicator 
          size="large"
          color="#FFF"
        />
      </Container>
    )
  }

  return(
    <LinearGradient
      colors={['#38475B', '#191A30']}
      style={{flex: 1, justifyContent: 'center'}}
    >
    <Container>
      <Header>
        <HeaderButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Feather 
            name="arrow-left"
            size={28}
            color="#FFF"
          />
        </HeaderButton>
        <HeaderButton onPress={() => handleFavoriteMovie(movie)} >
          { favoritedMovie ? (
            <Ionicons 
            name="bookmark"
            size={28}
            color="#FFF"
          />
          ) : (
            <Ionicons 
            name="bookmark-outline"
            size={28}
            color="#FFF"
          />
          )}
        </HeaderButton>
      </Header>
      <Banner
        resizeMethod="resize"
        source={{uri: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}}
      />

      <ButtonLink activeOpacity={0.3} onPress={() => setOpenLink(true)} >
        <Feather 
          name="link"
          size={28}
          color="#FFF"
        />
      </ButtonLink>

      <Title numberOfLines={2} > {movie.title} </Title>

      <ContentArea>
        <Stars 
          default={movie.vote_average}
          count={10}
          half={true}
          starSize={20}
          fullStar={<Ionicons name="md-star" size={22} color="#E7A74E" />}
          emptyStar={<Ionicons name="md-star-outline" size={22} color="#E7A74E" />}
          halfStar={<Ionicons name="md-star-half" size={22} color="#E7A74E" />}
          disabled={true}
        />
        <Rate>{movie.vote_average}/10 </Rate>
      </ContentArea>

      <ListGenres 
        data={movie?.genres}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => <Genres data={item} />}
      />
      {/* <Overview>{releaseDate}</Overview> */}

      {/* <Provider 
        source={{uri: `https://image.tmdb.org/t/p/original/${providers}`}}
      /> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title> Overview </Title>
        {movie?.overview ? (
          <Overview>{movie?.overview}</Overview>
        ) : (
          <Overview> -- No overview -- </Overview>
        )}

        <PlayerContainer>
          <YoutubePlayer
            height={350}
            width={350}
            play={playing}
            videoId={providers}
            onChangeState={onStateChange}
            mute
          />
        </PlayerContainer>
        
      </ScrollView>

      <Modal animationType="slide" transparent visible={openLink} >
        <ModalLink 
          link={movie?.homepage}
          title={movie?.title}
          closeModal={() => setOpenLink(false)}
        />
      </Modal>

    </Container>
    </LinearGradient>
  )
}

export default Details;