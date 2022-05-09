import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

// estrelas para usar é só tirar os comentarios da importação e do componente
// import Stars from './Stars';

// essa area pode ser uma view apenas, só inverter o styled com o seeprofileButton
const Area = styled.View`
    background-color: yellow;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    margin-left:  30px;
    margin-right:  30px;
    flex-direction: row;
`;


// SE POR ACASO QUEREREM UMA IMAGEM, JÁ TA AQUI O ESPAÇO DELA 
// const Avatar = styled.Image`
//     width: 88px;
//     height: 88px;
//     border-radius: 20px;
// `;

// margin-left aqui pode ser de 20 se tiver um AVATAR
const InfoArea = styled.TouchableOpacity`
    flex:1;
    align-items: center;
    /* margin-left: 100px; */
    justify-content: center;
`;


const UserName = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;

// margin-top 
const SeeProfileButton = styled.TouchableOpacity`
    width: 85px;
    height: 26px;
    border: 1px solid #4EADBE;
    border-radius:10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top:10px;
`;

const SeeProfileButtonText = styled.Text`
    font-size: 13px;
    color: #268596;
`;




// recebe os dados da API como data para montar um apiario
// o data tem  de ter todas as informações a serem passadas
export default ({ data }) => { 
    console.log(data, "data")
    const navigation = useNavigation();

    // segundo parametro do navigate, é para passar os parametros 
    // vai ser os parametros da tabela Apiario?
    const handleClickApiario = () =>{
        navigation.navigate('Apiario')
        
    }

    const handleClickCrias = () =>{
        navigation.navigate('Crias')
        
    }

    const handleClickAlimentacao = () =>{
        navigation.navigate('Alimentacao')
        
    }

    const deparaSituacao = (situacao) => {  
        switch(situacao){ 
            case 'A': 
                return 'Ativo';
            case 'I':
                return 'Inativo'
        }
    }
    const Item = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.nomeApiario}>{nomeApiario}</Text>
        </View>
     );

    const renderItem = ({ item }) => <Item title={item.nomeApiario} />;

    const editarApiario = (id) => { 
        navigation.navigate('EditarApiario', {
            idApiarioRota: id,
    })
    }

    return ( 
        <Area> 
            <InfoArea onPress={() => {editarApiario(data.idApiario)}}>
                <UserName>Nome Apiário: {data.nomeApiario}</UserName>
                <UserName>Cidade: {data.cidade}</UserName>
                <UserName>UF: {data.uf}</UserName>
                <UserName>Situacao: {deparaSituacao(data.situacao)}</UserName>
            </InfoArea>
        </Area>
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });

// PARTE 2 AOS 10 MINUTOS
// ASSIM PASSA OS PARAMETROS PARA A PROXIMA PAGINA 

// const handleClickApiario = () =>{
//     navigation.navigate('Apiario', {
//          id: data.idApiario,
//              nome: data.nomeApiario,
//              cidade: data.cidade,
//             uf: data.uf,
//             situacao: data.situacao
//     })
    
// }

// PARAMETROS PARA PASSAR PARA TELA DE APIARIO, ESTA NO MINUTO 10:38 DA PARTE 2 DO VIDEO 
// {
//     id: data.idApiario,
//     nome: data.nomeApiario,
//     cidade: data.cidade,
//     uf: data.uf,
//     situacao: data.situacao
// }