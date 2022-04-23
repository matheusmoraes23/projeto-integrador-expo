import React, { useState, useEffect } from 'react';
import { ScrollView, View, Platform, RefreshControl, StyleSheet, Text, Button, Alert, ActivityIndicator, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
// import { request, PERMISSIONS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Api from '../../Api';
import api from '../../services/api';

import ComeiaItem from '../../components/ComeiaItem';
import { TouchableNativeFeedback } from 'react-native'


import {
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    SearchButton,

    SelectArea,
    SelectInput,

    LoadingIcon,
    ListArea,

    ListAreaApiario,
    IncluirApiario,
    Branco
} from './styles';


import SearchIcon from '../../assets/search.svg';
import AdicionarIcon from '../../assets/add.svg';
import Bee from "../../assets/bee 1.svg";


import Icon from 'react-native-vector-icons/Ionicons';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
Icon.loadFont()






export default ({ route }) => {
    const navigation = useNavigation();


    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([])
    const [PickerValueHolder, SetPickerValueHolder] = useState([])



    const [refreshing, setRefreshing] = useState();
    const [idUsuario, setIdUsuario] = useState(null);
    const [apíarios, setApiarios] = useState([]);
    useEffect(() => { 
    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('LOGADO');
          var novo =  value != null ? JSON.parse(value) : null;
          if (novo !== null) {
            // We have data!!
            console.log(novo.idUsuario, "value")
            setIdUsuario(novo.idUsuario);
          }
        } catch (error) {
          console.log(error)
      }
      };

      _retrieveData()
    },[])

    useEffect(() => { 
        console.log(idUsuario)
        if(idUsuario != null){ 

            const verificarApiario  = async (idUsuario) => { 


                let res = await Api.getApiario(idUsuario);
        
                if(res.request == 400 && res.sucesso == false){ 
                    console.log("não existe apiario")
                } else { 
                    console.log(res)
                    console.log("existe apiario")
                }
        
            }

            verificarApiario()

        }
    },[idUsuario])


    const getComeiaApi = async () =>  {
        try {

            setList([]);
            let res = await Api.getComeias();

            if(res.sucesso = true) {
                console.log(res.entities);
                setList(res.entities);
            } else { 
                alert("Erro: "+res.msg);
            }

        } catch (error) {
          console.error(error);
        }
    }
        
    useEffect(() => {
        // getComeiaApi();
    }, [])


    // const onRefresh = () => {
    //     setRefreshing(false);
    //     getComeias();
    // }

    const [cursos, setCursos] = useState(['Android', 'NodeJs', 'Python', 'PHP', 'Asp'])
    const [cursoSelecionado, setCursoSelecionado] = useState([])

   
    return (
        <Container>
            {/*  refreshControl faz aquele esquema de recarregar a pagina quando puxa para cima 
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            } */}
            <Scroller >


                <HeaderArea>
                    <Bee width="26" height="26" />
                    <HeaderTitle > - </HeaderTitle>
                    {/* numberOfLines={2} */}
                    <SearchButton onPress={() => navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#FFFFFF" />
                    </SearchButton>
                </HeaderArea>

                <Branco>
                {
                    apíarios.length != 0 ? 
                    <>
                <Picker
                    selectedValue={PickerValueHolder}
                    style={{marginTop: 50}}
                    onValueChange={(itemValue, itemIndex) =>
                        SetPickerValueHolder(itemValue)
                    }
                >
                    {
                    list.map((item, key) =>{
                        return <Picker.Item label={item.nrComeia} value={item} key={key}/>
                    }) 
                    
                    }



                </Picker>

                <View>
                    <Text style={{marginBottom:10}}>
                        {/*  vai ser o resultado, colocar uma condição ternaria  */}
                        Apiario selecionado foi: {PickerValueHolder.nrComeia}
                    </Text>
                </View>

                <Button onPress={getComeiaApi}  title="Buscar Apiario" style={{marginTop:10}} />
                </>
                :
                null
                }


                {/* <SelectArea>                     */}
                    
                    {/* <SelectInput
                        placeholder="Selecione sua Comeia"
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText={t => setLocationText(t)}
                    // quando o cara termina e da um enter
                    // é chamado esse endEditing
                    // onEndEditing={handleLocationSearch}
                    />
                    SÓ COMENTAR ESSE LOCATION E TIRA A BOLINHA DA BARRA
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
                    </LocationFinder> */}

                {/* </SelectArea> */}

                {/* {loading &&
                    <LoadingIcon size="large" color="#FFFFFF" />
                } */}

                <ListArea> 
                {
                    apíarios.length != 0 ? 
                    <ComeiaItem  data={PickerValueHolder} /> 
                    :
                    <>
                    <IncluirApiario onPress={() => console.log('Adicionar')}>
                        <AdicionarIcon width="100" height="150" />
                        <Text>Adicionar Apiário</Text>
                    </IncluirApiario>
                    {/* // <ActivityIndicator size="large" color="#FFFFFF" /> */}

                    </>
                }

                        {/* list.map((item, key) => {
                            return <ComeiaItem label={item.nrComeia} data={PickerValueHolder} key={key}  />
                        }) */}
                {/* {list.map((item, k)=>(
                    <ComeiaItem key={k} data={item} />
                ))} */}

                    {/* {list.length > 0 ? 
                    
                    list.map((item, k)=>(
                        // o data é oq vem da requisição, vai ser apiario mais tarde
                        <ComeiaItem key={k} data={item} />
                    ))
                    :
                    <Text>Nenhuma Comeia Selecionada</Text>
                
                    } */}
                    
                    
                    {/* SÓ DESCOMENTAR O MAP E PASSAR DADOS DA API */}
                    {/* {list.map((item, k)=>(
                        // o data é oq vem da requisição, vai ser apiario mais tarde
                        <ComeiaItem key={k} data={item} />
                        
                    ))} */}
                    {/* <ComeiaItem /> */}
                    
                    

                    {/* <Text style={styles.textSelecionado}>
                    {setSelectedLanguage.itemValue}    
                    </Text>  */}
                </ListArea> 
                </Branco>
            </Scroller>
        </Container>
    )
}