import React from 'react';
import {Share} from 'react-native';
import {Ionicons, Feather} from '@expo/vector-icons';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import {
    Container,
    Title,
    InfoContainer,
    DetailContainer,
    DeleteContainer,
    Banner,
    RateContainer,
    Rate,
    ActionContainer,
    DetailButton,
    DeleteButton,
    ListCompanies,
    ProductionCompanies,
} from './styles';

function FavoriteItem({data, deleteMovie, navigatePage}) {
    async function handleShare(){
        try {
            const result = await Share.share({
                message: `Look this movie: ${data?.homepage}`
            });

            if(result.action === Share.sharedAction){
                if(result.activityType){
                    console.log('ActivityType');
                }else{
                    console.log('Shared with success!')
                }
            }else if(result.action === Share.dismissedAction){
                console.log('Close!');
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    function RightActions(){
        return(
            <DeleteContainer onPress={() => deleteMovie(data.id)} >
                <Feather 
                    name="trash"
                    size={24}
                    color="#FFF"
                />
            </DeleteContainer>
        )
    }

    function addZero(number){
        if(number <= 9){
            return '0' + number;
        } else {
            return number;
        }
    }
    let dateRelease = new Date(`${data.release_date}`);
    let formatDate = (addZero(dateRelease.getMonth()+1).toString()) + '/' + (addZero(dateRelease.getDate().toString())) + '/' + dateRelease.getFullYear();


  return(
    <Container>
        <InfoContainer>
            <Banner
                resizeMode="contain"
                source={{uri: `https://image.tmdb.org/t/p/original/${data.poster_path}`}}
            />
            <DetailContainer>
                <Title size={22} numberOfLines={1} >{data.title}</Title>
                <RateContainer>
                    <Ionicons 
                        name='md-star'
                        size={12}
                        color='#E7A73E'
                    />
                    <Rate>{data.vote_average}/10</Rate>
                </RateContainer>
                <Rate>Release Date: {formatDate}</Rate>
                    <Swipeable renderRightActions={RightActions} >
                        <ActionContainer>
                            <DetailButton onPress={() => navigatePage(data)} >
                                <Title size={14} >Show Details</Title>
                            </DetailButton>
                            
                            <DeleteButton onPress={handleShare} >
                                <Feather 
                                    name='share'
                                    size={24}
                                    color='#FFF'
                                />
                            </DeleteButton>
                        </ActionContainer>
                    </Swipeable>
            </DetailContainer>
        </InfoContainer>
    </Container>
  )
}

export default FavoriteItem;