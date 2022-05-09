import React, {useContext} from 'react';
import styled from 'styled-components/native';

import { UserContext } from '../contexts/UserContext';

import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
import TodayIcon from '../assets/today.svg';
import FavoriteIcon from '../assets/favorite.svg';
import AccountIcon from '../assets/account.svg';



const TabArea = styled.View`
    height:60px;
    background-color: #4EADBE;
    flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;


// PODE USAR ESSE COMPONENTE OU O TAB ITEM NORMAL
// SÓ TROCAR O COMPONENTE EM BAIXO
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

// SE O USUARIO TIVER IMAGEM, APARECE AQUI 
const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;

export default ( { state, navigation }) => {
    // CON
    //const { state:user} = useContext(UserContext)

    const goTo = (screenName) =>{
        navigation.navigate(screenName);
    }

    return (
        <TabArea>
            <TabItem onPress={()=>goTo('ListarApiario')}>
                <HomeIcon style={{opacity: state.index===0? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />

            </TabItem>
            <TabItem onPress={()=>goTo('Search')}>
                <SearchIcon style={{opacity: state.index===1? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />
                
            </TabItem>
            {/*<TabItemCenter onPress={()=>goTo('Appointments')}>
                <TodayIcon  width="32" height="32" fill="#4EADBE" />
                 style={{opacity: state.index===2? 1 : 0.5}} 
            </TabItemCenter> */}
            <TabItem onPress={()=>goTo('ListarColmeia')}>
                <FavoriteIcon style={{opacity: state.index===3? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />
                
            </TabItem>
            <TabItem onPress={()=>goTo('Profile')}>
                { /* SE O USUARIO TIVER ICONE, AQUI CARREGA ELE */}
                {/* {user.avatar != '' ?
                    <AvatarIcon source={{uri: user.avatar}} />
                    :
                    <AccountIcon style={{opacity: state.index===4? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />
                } */}


                <AccountIcon style={{opacity: state.index===4? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />
                
            </TabItem>
        </TabArea>
    );
}