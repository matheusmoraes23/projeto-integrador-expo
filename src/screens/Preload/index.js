import React, { useEffect, useContext } from 'react';
import { Container, LoadingIcon } from './styles';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import Api from '../../Api';
import AbelhaPreLoad   from '../../assets/abelhaPreLoad.svg';
// import { useContext } from 'react/cjs/react.development';
import { UserContext } from '../../contexts/UserContext';
import { Image } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import AguaPreLoad from "../../assets/aguaPreLoad.svg";

export default () => {
    
    
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(() =>{
        const checkToken = async () =>{
            const token = await AsyncStorage.getItem('token');
            if(token) {
                // valida o token
                let res = await Api.checkToken(token);
                if(res.token){
                    await AsyncStorage.setItem('token', res.token);

                    userDispatch({
                        type: 'setAvatar',
                        payload:{
                            avatar: res.data.avatar
                        }
                    })

                } else { 
                    navigation.navigate('SignIn');
                }
            } else {
                navigation.navigate('SignIn');
            }

        }
        checkToken();
    }, []);

    return (
        <Container>
            {/* <Svg> */}
            <AguaPreLoad width="100%" height="160" />
            {/* </Svg> */}
            {/* <Image source={AbelhaPreLoad} style={{ width: "100%", height: "160" }} />  */}
            <LoadingIcon size="large" color="#FFFFFF" />
        </Container>
    )
}