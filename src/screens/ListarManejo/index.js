import React, { useState, useEffect } from 'react';
import { ScrollView, View, Platform, RefreshControl, StyleSheet, Text, Button, Alert, ActivityIndicator, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Api';
import ComeiaItem from '../../components/ComeiaItem';
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
import ManejoItem from '../../components/ManejoItem';
Icon.loadFont()






export default ({ route, navigation }) => {



    const [refreshing, setRefreshing] = useState();
    const [idUsuario, setIdUsuario] = useState(null);
    const [manejos, setManejos] = useState([]);

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
                                let res = await Api.getManejos(id);

                                if (res.request == 400 && res.sucesso == false) {
                                    console.log("não existe apiario")
                                } else {
                                    console.log(res.manejos)
                                    setManejos(res.manejos)
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
                                let res = await Api.getManejos(id);

                                if (res.request == 400 && res.sucesso == false) {
                                    console.log("não existe apiario")
                                } else {
                                    setManejos(res.manejos)
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
                        manejos && manejos.length != 0 ?


                            <>
                                <View>
                                    <Text style={{ marginTop: 15, marginLeft: 20 }}>
                                    Manejos
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
                            manejos && manejos.length != 0 ?
                                <>
                                    {manejos.map((item, i) => { 
                                        return <ManejoItem data={item} key={i} />
                                    })}
                                    <IncluirApiario onPress={() => navigation.navigate('CadastrarManejo', {
                                        idUsuarioRota: idUsuario
                                    })}>
                                        <AdicionarIcon width="100" height="150" />
                                        <Text>Adicionar Manejo</Text>
                                    </IncluirApiario>
                                </>
                                :
                                <>
                                    <IncluirApiario onPress={() => navigation.navigate('CadastrarManejo', {
                                        idUsuarioRota: idUsuario
                                    })}>
                                        <AdicionarIcon width="100" height="150" />
                                        <Text>Adicionar Manejo</Text>
                                    </IncluirApiario>
                                    {/* // <ActivityIndicator size="large" color="#FFFFFF" /> */}

                                </>
                        }

                    </ListArea>
                </Branco>
            </Scroller>
        </Container>

    )
}