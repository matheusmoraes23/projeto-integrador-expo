import React, { useState, useEffect } from 'react';
import { ScrollView, View, Platform, RefreshControl, StyleSheet, Text, Button, Alert, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Api';
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
import ApiarioItem from '../../components/ApiarioItem';
import AguaTela from "../../assets/aguaTela.svg"
Icon.loadFont()

export default ({ route }) => {
    const navigation = useNavigation()


    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([])
    const [PickerValueHolder, SetPickerValueHolder] = useState([])



    const [refreshing, setRefreshing] = useState();
    const [idUsuario, setIdUsuario] = useState(null);
    const [apiarios, setApiarios] = useState([]);
    useEffect(() => {
        if(route.params == undefined){
        _retrieveData = async () => {
            try {
                //   const value = await AsyncStorage.getItem('LOGADO');

                AsyncStorage.getItem('LOGADO').then((value) => {
                    var novo = value != null ? JSON.parse(value) : null;
                    if (novo !== null) {
                        // We have data!!
                        var id = novo.idUsuario
                        const verificarApiario = async (id) => {
                            try {
                                let res = await Api.getApiarios(id);

                                if (res.request == 400 && res.sucesso == false) {
                                    console.log("não existe apiario")
                                } else {
                                    setApiarios(res.apiarios)
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
    }, [route.params])



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
        onRefresh();
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
                        const verificarApiario = async (id) => {
                            try {
                                let res = await Api.getApiarios(id);

                                if (res.request == 400 && res.sucesso == false) {
                                    console.log("não existe apiario")
                                } else {
                                    setApiarios(res.apiarios)
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


    return (
        <Container>
            {/* refreshControl faz aquele esquema de recarregar a pagina quando puxa para cima  */}

            <Scroller  refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
            } >


                <HeaderArea>
                    <AguaTela width="26" height="26" />
                    <HeaderTitle > Relatórios </HeaderTitle>
                    <SearchButton  onPress={() => console.log("abrir texto")}>
                        <SearchIcon width="26" height="26" fill="#FFFFFF" />
                    </SearchButton>
                </HeaderArea>

                <Branco>
                    {
                        apiarios && apiarios.length != 0 ?


                            <>
                                {/* <View>
                                    <Text style={{ marginTop: 15, marginLeft: 20 }}>
                                        <Text>Relatórios</Text>
                                    </Text>
                                </View> */}
                            </>
                            :
                            null
                    }


                    {/* {loading &&
                    <LoadingIcon size="large" color="#FFFFFF" />
                } */}

                    <ListArea>
                        {
                            apiarios && apiarios.length != 0 ?

                            <>
                                {apiarios.map((item,i) => { 
                                    return <ApiarioItem data={item} key={i} />
                                })}
                                <IncluirApiario onPress={() => navigation.navigate('CadastrarRelatorio', {
                                        idUsuarioRota: idUsuario
                                    })}>
                                        <AdicionarIcon width="100" height="150" />
                                        <Text>Adicionar Relatório</Text>
                                    </IncluirApiario>
                            </>
                                :
                                <>
                                    <IncluirApiario onPress={() => navigation.navigate('CadastrarRelatorio', {
                                        idUsuarioRota: idUsuario
                                    })}>
                                        <AdicionarIcon width="100" height="150" />
                                        <Text>Adicionar Relatório</Text>
                                    </IncluirApiario>

                                </>
                        }

                    </ListArea>
                </Branco>
            </Scroller>
        </Container>
    )
}