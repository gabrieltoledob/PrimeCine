import React, {useState, useEffect} from 'react';

import {
    Container,
    ListMovies,
} from './styles';

import {useNavigation, useRoute} from '@react-navigation/native';
import api, {key} from '../../services/api';
import SearchItem from '../../components/SearchItem';

function Search() {
    const navigation = useNavigation();
    const route = useRoute();

    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        async function getSearchMovie(){
            const response = await api.get('/search/movie', {
                params:{
                    query: route?.params.name,
                    api_key: key,
                    page: 1,
                }
            })
            if(isActive){
                setMovie(response.data.results);
                setLoading(false);
            }
        }

        if(isActive){
            getSearchMovie();
        }

        return () => {
            isActive = false;
        }

    }, []);

    function navigateDetailsPage(item){
        navigation.navigate('Details', {id: item.id});
    }

    if(loading){
        return(
            <Container></Container>
        )
    }

  return(
      <Container>
          <ListMovies
            data={movie}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => <SearchItem data={item} navigatePage={() => navigateDetailsPage(item)} />}
          />
      </Container>
  )
}

export default Search;