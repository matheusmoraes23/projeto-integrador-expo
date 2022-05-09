import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;    
    background-color: #FFF614;
    margin-top: 25px;
`;
// PARA A TELA NÃO SER TER UM SCROLL, MUDAR AQUI
export const Scroller = styled.ScrollView`
    flex: 1;
    padding-top: 25px;
`;

export const HeaderArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
`;
export const HeaderTitle = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #000;
`;
export const SearchButton = styled.TouchableOpacity`
    width: 26px;
    height: 26px;
`;

export const SelectArea = styled.View`
    background-color: #4EADBE;
    height: 60px;
    border-radius: 30px;
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 30px;
`;

export const SelectInput = styled.TextInput`
    flex: 1;
    font-size:16px;
    color: #FFFFFF;
`;

export const LocationFinder = styled.TouchableOpacity`
    width: 24px;
    height: 24px;
`;

export const LoadingIcon = styled.ActivityIndicator`
        margin-top: 50px;
`;

export const ListArea = styled.ScrollView`
        margin-top: 50px;
        margin-bottom: 30px;
`;

export const ListAreaApiario = styled.View`
        background-color: #9309;
        margin-top: 50px;
        margin-bottom: 30px;
`;

export const IncluirApiario = styled.TouchableOpacity`
    margin-top: 130px;
    align-items: center;
`;


export const Branco = styled.View`
    background-color: #FFF;
    height: 1000;
    border-radius: 50px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
`;
