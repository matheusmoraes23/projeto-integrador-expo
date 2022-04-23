import React from 'react';
import styled  from 'styled-components/native';
import { Image } from 'react-native';


const InputArea = styled.View`
    width: 100%;
    height: 60px;
    background-color: #000;
    flex-direction:row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`;

const Input = styled.TextInput`
    flex:1;
    font-size:16px;
    color: white;
    margin-left: 10px;
`;

export default ({IconSvg, placeholder, value, onChangeText, password}) => {  //password
    return (
        <InputArea>
            {/* <IconSvg width="24" height="24" fill="#FFF614" /> */}
            {/* <Image source={IconSvg} style={{ width: "24", height: "24", color: '#FFF614' }} />  */}
            <Input
                secureTextEntry={password}
                placeholder={placeholder}
                placeholderTextColor="white"
                value={value}
                onChangeText = {onChangeText}
            />
        </InputArea>
    );
}