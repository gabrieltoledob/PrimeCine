import AsyncStorage from '@react-native-async-storage/async-storage';

//Search saved movies
export async function getMoviesSave(key){
    const myMovies = await AsyncStorage.getItem(key);

    let moviesSave = JSON.parse(myMovies) || [];
    return moviesSave;
}

//Save a new movie
export async function saveMovies(key, newMovie){
    let movieStored = await getMoviesSave(key)

    //Don't save the movie if you already have one with the same id or duplicate
    const hasMovie = movieStored.some(item => item.id === newMovie.id)

    if(hasMovie){
        alert('This movie already exists on your list!')
    }

    movieStored.push(newMovie);

    await AsyncStorage.setItem(key, JSON.stringify(movieStored));
}

//Delete movie
export async function deleteMovie(id){
    let movieStored = await getMoviesSave('@primecine');

    let myMovies = movieStored.filter(item => {
        return (item.id !== id);
    })

    await AsyncStorage.setItem('@primecine', JSON.stringify(myMovies));
    return myMovies;
}

//Filter a movie saved
export async function hasMovie(movie){
    let movieStored = await getMoviesSave('@primecine');

    const hasMovie = movieStored.find(item => item.id === movie.id)

    if(hasMovie){
        return true;
    }

    return false;

}