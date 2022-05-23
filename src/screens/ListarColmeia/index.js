import React, { useState, useEffect } from 'react';
import { ScrollView, View, Platform, RefreshControl, StyleSheet, Text, Button, Alert, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { request, PERMISSIONS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Api from '../../Api';
import api from '../../services/api';
import { Picker } from '@react-native-picker/picker';

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






export default ({ route, navigation }) => {
    // const {  } = route.params;

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([])
    const [PickerValueHolder, SetPickerValueHolder] = useState([])


    console.log(route, "route")
    const [refreshing, setRefreshing] = useState();
    const [idUsuario, setIdUsuario] = useState(null);
    const [colmeias, setColmeias] = useState([]);

    useEffect(() => {
        _retrieveData = async () => {
            try {
                //   const value = await AsyncStorage.getItem('LOGADO');

                AsyncStorage.getItem('LOGADO').then((value) => {
                    var novo = value != null ? JSON.parse(value) : null;
                    if (novo !== null) {
                        // We have data!!
                        var id = novo.idUsuario
                        setIdUsuario(id);
                        const verificarApiario = async (id) => {
                            try {
                                let res = await Api.getColmeias(id);

                                if (res.request == 400 && res.sucesso == false) {
                                    console.log("não existe apiario")
                                    setTab('cadastrarColmeias')
                                } else {
                                    setColmeias(res.colmeias)
                                }
                            } catch (error) {
                                console.log(error)
                            }
                        }

                        verificarApiario(id)
                    }
                })
            } catch (error) {
                console.log(error)
            }
        };

        _retrieveData()
    }, [])



    const getComeiaApi = async () => {
        try {

            setList([]);
            let res = await Api.getComeias();

            if (res.sucesso = true) {
                console.log(res.entities);
                setList(res.entities);
            } else {
                alert("Erro: " + res.msg);
            }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        // getComeiaApi();
    }, [])


    const onRefresh = () => {
        setRefreshing(false);
        _retrieveData = async () => {
            try {
                //   const value = await AsyncStorage.getItem('LOGADO');

                AsyncStorage.getItem('LOGADO').then((value) => {
                    var novo = value != null ? JSON.parse(value) : null;
                    if (novo !== null) {
                        // We have data!!
                        var id = novo.idUsuario
                        setIdUsuario(id);
                        const verificarApiario = async (id) => {
                            try {
                                let res = await Api.getColmeias(id);

                                if (res.request == 400 && res.sucesso == false) {
                                    console.log("não existe apiario")
                                    setTab('cadastrarColmeias')

                                } else {
                                    setColmeias(res.colmeias)
                                }
                            } catch (error) {
                                console.log(error)
                            }
                        }

                        verificarApiario(id)
                    }
                })
            } catch (error) {
                console.log(error)
            }
        };

        _retrieveData()
    }

    const [cursos, setCursos] = useState(['Android', 'NodeJs', 'Python', 'PHP', 'Asp'])
    const [cursoSelecionado, setCursoSelecionado] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [ufSelecionado, setUfSelecionado] = useState('');

    const uf = [
        "AC",
   ]

    return (
        <Container>
            {/* refreshControl faz aquele esquema de recarregar a pagina quando puxa para cima  */}

            <Scroller refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            } >


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
                        colmeias && colmeias.length != 0 ?


                            <>
                                <View>
                                    <Text style={{ marginTop: 15, marginLeft: 20 }}>
                                        {/*  vai ser o resultado, colocar uma condição ternaria  */}
                                        {/* Colmeias */}
                                        {/* <Picker
                                selectedValue={ufSelecionado}
                                onValueChange={(itemValue, itemIndex) =>
                                    setUfSelecionado(itemValue)
                                }
                                >
                                <Picker.Item label="Selecione um estado" value="" />
                                {uf.map((item, i) => { 
                                    return <Picker.Item label={item} value={item} key={i} />
                                })}
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                                </Picker> */}
                                Colmeias
                                    </Text>
                                </View>
                            </>
                            :
                            null
                    }


                    {/* {loading &&
                    <LoadingIcon size="large" color="#FFFFFF" />
                } */}

                    <ListArea>
                        {
                            colmeias && colmeias.length != 0 ?
                                <>
                                    {colmeias.map((item, i) => { 
                                        return <ComeiaItem data={item} key={i} />
                                    })}
                                    <IncluirApiario onPress={() => navigation.navigate('CadastrarColmeia', {
                                        idUsuarioRota: idUsuario
                                    })}>
                                        <AdicionarIcon width="100" height="150" />
                                        <Text>Adicionar Colmeia</Text>
                                    </IncluirApiario>
                                </>
                                :
                                <>
                                    <IncluirApiario onPress={() => navigation.navigate('CadastrarColmeia', {
                                        idUsuarioRota: idUsuario
                                    })}>
                                        <AdicionarIcon width="100" height="150" />
                                        <Text>Adicionar Colmeia</Text>
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