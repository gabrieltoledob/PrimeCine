import React, {useState, useEffect} from 'react';
import {ScrollView, ActivityIndicator} from 'react-native';

import {
  Container,
  SearchContainer,
  Input,
  SearchButton,
  Title,
  LogoContainer,
  LogoView,
  BannerButton,
  Banner,
  SliderMovies,
} from './styles';
import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';

import {Feather} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';

import api, {key} from '../../services/api';
import {getListMovies, randomBanner} from '../../utils/movie';

import {useNavigation} from '@react-navigation/native';

// Key API Films => 6d11267f70ded103f665c42aea108a0d

function Home() {

  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [bannerMovie, setBannerMovie] = useState({});
  const [input, setInput] = useState('');

  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getMovies(){
      const [nowData, popularData, topData] = await Promise.all([
        api.get('/movie/now_playing', {
            params:{
              api_key: key,
              language: 'en',
              page: 1,
            }
        }),
        api.get('/movie/popular', {
          params:{
            api_key: key,
            language: 'en',
            page: 1,
          }
        }),
        api.get('/movie/top_rated', {
          params:{
            api_key: key,
            language: 'en',
            page: 1,
          }
        }),
      ])

      if(isActive){
        const nowList = getListMovies(10, nowData.data.results);
        const popularList = getListMovies(6, popularData.data.results);
        const topList = getListMovies(5, topData.data.results);

        setBannerMovie(nowData.data.results[randomBanner(nowData.data.results)]);
        setNowMovies(nowList);
        setPopularMovies(popularList);
        setTopMovies(topList);

        setLoading(false);
      }
    }

    getMovies();

    return () => {
      isActive = false;
      ac.abort();
    }
  }, []);

  function navigateDetailsPage(item){
    navigation.navigate('Details', {
      id: item.id
    })
  }

  function handleSearchMovie() {
    if(input === ''){
      alert('Fill the search field please!');
      return;
    }

    navigation.navigate('Search', {name: input});
    setInput('');
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
      <Header title="Prime Cine" />

      <SearchContainer>
        <Input 
          placeholder="Search movies"
          placeholderTextColor="#DDD"
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <SearchButton onPress={handleSearchMovie}>
          <Feather
            name="search"
            size={30}
            color="#FFF"
          />
        </SearchButton>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Now Playing</Title>
        
        <BannerButton activeOpacity={0.9} onPress={ () => navigateDetailsPage(bannerMovie)}>
          <Banner 
            resizeMode="stretch"
            source={{uri: `https://image.tmdb.org/t/p/original/${bannerMovie.backdrop_path}`}}
          />
        </BannerButton>

        <SliderMovies 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={ ({item}) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} />}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Popular</Title>
        <SliderMovies 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={ ({item}) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} />}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Top Rated</Title>
        <SliderMovies 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={ ({item}) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} />}
          keyExtractor={(item) => String(item.id)}
        />

      </ScrollView>

    </Container>
    </LinearGradient>
  )
}

export default Home;