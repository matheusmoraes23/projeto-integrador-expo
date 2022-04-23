import React from 'react';
import styled from 'styled-components/native';


import StarFull from '../assets/star.svg';
import StarHalf from '../assets/star_half.svg';
import StartEmpty from '../assets/star_empty.svg';
import { floor } from 'react-native-reanimated';

const StarArea = styled.View`
    flex-direction: row;
`;

const StarView = styled.View`
    flex-direction: row;
`;

const StarText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    margin-left: 5px;
    color: #737373;
`;


export default ({ stars, showNumber}) => {
    // 0 = ESTRELA VAZIA
    // 1 = ESTRELA MEIA
    // 2 = ESTRELA CHEIA
    let s = [0, 0, 0, 0, 0];

    // logica para transformar numeros em estrelas

    // retorna  o menor número inteiro dentro das stars

    // entender essa logica depois
    let floor = Math.floor(stars);
    let left = stars - floor;

    for(var i=0; i<floor; i++) { 
        s[i] = 2;
    }
    if(left > 0) { 
        s[i] = 1;
    }
    ////////////////////////////////
    
    return ( 
        <StarArea>
            {s.map((i, k)=>(
                <StarView key={k}>
                    {i === 0 && <StartEmpty width="18" height="18" fill="#FF9200"  />}
                    {i === 1 && <StarHalf width="18" height="18" fill="#FF9200"  />}
                    {i === 2 && <StarFull width="18" height="18" fill="#FF9200"  />}
                </StarView>
            ))}
            {showNumber && <StarText>{stars}</StarText>}
        </StarArea>
    );
}