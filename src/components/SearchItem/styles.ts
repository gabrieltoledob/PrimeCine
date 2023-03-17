import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  padding: 14px;
`;

export const ContainerMovie = styled.View`
    flex-direction: row;
`;

export const Banner = styled.Image`
    width: 100px;
    height: 155px;
    border-radius: 8px;
`;

export const Title = styled.Text`
    color: #FFF;
    font-size: 18px;
    font-weight: bold;
    padding-left: 8px;
    margin-right: 80px;
`;

export const RateContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding-top: 4px;
    padding-left: 8px;
`;

export const Rate = styled.Text`
    padding-left: 4px;
    color: #FFF;
    font-size: 12px;
`;

export const InfoMovie = styled.View`
    flex-direction: column;
`;

export const Overview = styled.Text`
    padding-left: 8px;
    padding-top: 4px;
    width: 290px;
    color: #FFF;
    font-size: 10px;
    text-align: justify;
`;
