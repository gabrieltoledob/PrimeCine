import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
    z-index: 99;
    position: absolute;
    top: 35px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    padding: 0 14px;
`;

export const HeaderButton = styled.TouchableOpacity`
    width: 46px;
    height: 46px;
    background-color: rgba(25, 25, 48, 0.7);
    border-radius: 23px;
    justify-content: center;
    align-items: center;
`;

export const Banner = styled.Image`
    width: 100%;
    height: 350px;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
`;

export const ButtonLink = styled.TouchableOpacity`
    background-color: #E72F49;
    width: 63px;
    height: 63px;
    border-radius: 35px;
    position: absolute;
    top: 300px;
    right: 15px;
    justify-content: center;
    align-items: center;
    z-index: 99;
`;

export const Title = styled.Text`
    color: #FFF;
    font-size: 19px;
    font-weight: bold;
    padding: 8px 10px;
    margin-top: 8px;
`;

export const ContentArea = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 0 14px;
    justify-content: space-between;
`;

export const Rate = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;

export const ListGenres = styled.FlatList`
    padding-left: 14px;
    margin: 10px 0;
    max-height: 35px;
    min-height: 35px;
`;

export const Overview = styled.Text`
    padding-left: 14px;
    padding-right: 14px;
    padding-bottom: 30px;
    color: #FFF;
    line-height: 20px;
`;

export const PlayerContainer = styled.View`
    align-items: center;
    justify-content: center;
`;

export const SliderMovies = styled.FlatList`
  height: 250px;
  padding: 0 14px;
`;