import React from 'react';
import styled from 'styled-components/native';
import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
import FavoriteIcon from '../assets/favorite.svg';



const TabArea = styled.View`
    height:60px;
    background-color: #000;
    flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;


const TabItemCenter = styled.TouchableOpacity`
    width: 70px;
    height 70px;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 35px;
    border: 3px solid #4EADBE;
    margin-top: -20px;
`;


export default ( { state, navigation }) => {
    
    const goTo = (screenName) =>{
        navigation.navigate(screenName);
    }

    return (
        <TabArea>
            <TabItem onPress={()=>goTo('ListarRelatorio')}>
                <HomeIcon style={{opacity: state.index===0? 1 : 0.5}} width="24" height="24" fill="#87CEFA" />
            </TabItem>
            <TabItem onPress={()=>goTo('ListarManejo')}>
                <SearchIcon style={{opacity: state.index===2? 1 : 0.5}} width="24" height="24" fill="#87CEFA" />
            </TabItem>
            <TabItem onPress={()=>goTo('ListarColmeia')}>
                <FavoriteIcon style={{opacity: state.index===1? 1 : 0.5}} width="24" height="24" fill="#87CEFA" />
            </TabItem>
        </TabArea>
    );
}