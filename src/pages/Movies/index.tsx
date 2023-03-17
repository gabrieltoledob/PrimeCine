import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';

import {
    Container,
    ListMovies,
} from './styles';

import Header from '../../components/Header';

import {getMoviesSave, deleteMovie} from '../../utils/storage';
import FavoriteItem from '../../components/FavoriteItem';

import {useNavigation, useIsFocused} from '@react-navigation/native';

import {LinearGradient} from 'expo-linear-gradient';
 
function Movies() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        let isActive = true;

        async function getFavoriteMovies(){
            const result = await getMoviesSave('@primecine');

            if(isActive){
                setMovies(result);
            }
        }

        if(isActive){
            getFavoriteMovies();
        }
        return () => {
            isActive = false;
        }

    }, [isFocused]);

    async function handleDelete(id){
        const result = await deleteMovie(id);
        setMovies(result);
    }

    function navigateDetailsPage(item){
        navigation.navigate('Details', {id: item.id})
    }

  return(
    <LinearGradient
    colors={['#38475B', '#191A30']}
    style={{flex: 1, justifyContent: 'center'}}
    >
      <Container>
          <Header title="My Movies"/>

          <ListMovies 
            showsVerticalScrollIndicator={false}
            data={movies}
            keyExtractor={item => String(item.id)}
            renderItem={ ({item}) => (
                <FavoriteItem 
                    data={item}
                    deleteMovie={handleDelete}
                    navigatePage={() => navigateDetailsPage(item)}
                />
            )}
          />
      </Container>
    </LinearGradient>
  )
}

export default Movies;