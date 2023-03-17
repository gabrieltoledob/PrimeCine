import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 14px;
`;
export const Title = styled.Text`
    color: #FFF;
    font-size: ${props => props.size}px;
    font-weight: bold;
`;

export const RateContainer = styled.View`
    flex-direction: row;
    padding: 8px 0;
`;

export const Rate = styled.Text`
    color: #FFF;
    font-size: 12px;
    padding-left: 4px;
`;

export const ActionContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 18%;
`;

export const DetailButton = styled.TouchableOpacity`
    width: 85%;
    height: 30px;
    background-color: #e72F49;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
`;

export const DeleteButton = styled.TouchableOpacity`
    width: 15%;
    height: 30px;
    justify-content: center;
    align-items: center;
`;

export const DetailContainer = styled.View`
    flex-direction: column;
    width: 78%;
    padding-left: 6px;
    padding-right: 14px;
`;

export const Banner = styled.Image`
    margin-top: 4px;
    border-radius: 8px;
    width: 100px;
    height: 150px;
`;

export const InfoContainer = styled.View`
    flex-direction: row;
    margin-bottom: 8px;
`;

export const DeleteContainer = styled.TouchableOpacity`
    width: 14%;
    height: 35px;
    background-color: #FF5555;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-left: 6px;
    margin-top: 16.1%;
`;
