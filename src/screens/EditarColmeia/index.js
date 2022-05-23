import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, SafeAreaView, TouchableOpacity, TextInput, View, Platform, RefreshControl, StyleSheet, Text, Button, Alert, ActivityIndicator, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Api';
import { Formik } from 'formik';
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
    Branco,
    InputArea,
    CustomButton, CustomButtonText,
    Voltar
} from './styles';
import SearchIcon from '../../assets/search.svg';
import Bee from "../../assets/bee 1.svg";
import NavPrev from "../../assets/nav_prev.svg";
import LocationIcon from "../../assets/my_location.svg";
import HomeIcon from "../../assets/home.svg";
import Icon from 'react-native-vector-icons/Ionicons';
import SignInput from '../../components/SignInput';
Icon.loadFont()




export default ({ route, navigation }) => {
    const { idColmeiaRota } = route.params;

    const [nomeColmeia, setNomeColmeia] = useState('');
    const [cidade, setCidade] = useState('');
    const [apiarioSelecionado, setApiarioSelecionado] = useState('');
    const [apiarios, setApiarios] = useState([]);

    const [ufSelecionado, setUfSelecionado] = useState('');

    const [colmeiaEditar, setColmeiaEditar] = useState('');
    const [validadorEditar, setValidadorEditar] = useState(0);

    
    const cadastrarColmeia = {
        nomeColmeia: '',
        cidade: '',
        uf: '',
        apiariosSelecionado: ''
    }



    useEffect(() => { 
        if(idColmeiaRota){ 
            _retrieveData = async () => { 

                const obterColmeia = async (idColmeiaRota) => {
                    try {
                        let res = await Api.getColmeia(idColmeiaRota);

                        if (res.request == 400 && res.sucesso == false) {
                            console.log("não existe colmeia")
                        } else {
                            setValidadorEditar(1)
                            setColmeiaEditar(res.colmeia)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
                obterColmeia(idColmeiaRota)
            }

            _retrieveData()
        }
    },[idColmeiaRota])

    useEffect(() => { 
        if(validadorEditar != 0  && colmeiaEditar != ''){ 
            setNomeColmeia(colmeiaEditar.nomeColmeia)
            setCidade(colmeiaEditar.cidade)
            setApiarioSelecionado(colmeiaEditar.idApiario)
            setUfSelecionado(colmeiaEditar.uf)
        } else { 
            setNomeColmeia('')
            setCidade('')
            setApiarioSelecionado('')
            setUfSelecionado('')
        }
    },[validadorEditar,colmeiaEditar])


    const [idUsuario, setIdUsuario] = useState(null);
    useEffect(() => {
        _retrieveData = async () => {
            try {
                const value = await AsyncStorage.getItem('LOGADO');
                var novo = value != null ? JSON.parse(value) : null;
                if (novo !== null) {
                    // We have data!!
                    // console.log(novo.idUsuario, "value")
                    setIdUsuario(novo.idUsuario);

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
            } catch (error) {
                console.log(error)
            }
        };

        _retrieveData()
    }, [])


    const editarColmeia = async (colmeia) => {

        let res = await Api.alterarColmeia(colmeia);
        console.log(res, "res")
        if (res.request == 200 && res.sucesso == true) {
            navigation.navigate('ListarColmeia');
        } else { 
            navigation.navigate('ListarColmeia');
        }
    }




    const uf = [
         "AC",
         "AL",
         "AP",
         "AM",
         "BA",
         "CE",
         "DF",
         "ES",
         "GO",
         "MA",
         "MT",
         "MS",
         "MG",
         "PA",
         "PB",
         "PR",
         "PE",
         "PI",
         "RJ",
         "RN",
         "RS",
         "RO",
         "RR",
         "SC",
         "SP",
         "SE",
         "TO",
    ]



    return (
        <Formik
            initialValues={cadastrarColmeia}
            // validationSchema={schema}
            onSubmit={(values) => {
                if (nomeColmeia != '' && cidade != '' && ufSelecionado != '' && apiarioSelecionado != '') {
                    const env = {
                        idColmeia:  idColmeiaRota,
                        idUsuario: idUsuario,
                        idApiario: apiarioSelecionado,
                        nomeColmeia: nomeColmeia.trim(),
                        cidade: cidade.trim(),
                        uf: ufSelecionado
                    }
                    editarColmeia(env)
                }
            }}
        >
            {({ setFieldValue, handleChange, handleBlur, handleSubmit, values }) => (
                <Container>
                    {/*  refreshControl faz aquele esquema de recarregar a pagina quando puxa para cima 
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            } */}
                    <Scroller >


                        <HeaderArea>
                            <Bee width="26" height="26" />
                            <HeaderTitle > - </HeaderTitle>
                            <SearchButton onPress={() => navigation.navigate('Search')}>
                                <SearchIcon width="26" height="26" fill="#FFFFFF" />
                            </SearchButton>
                        </HeaderArea>

                        <Branco>
                                <Voltar onPress={() => navigation.navigate('ListarColmeia')}>
                                    <NavPrev width="26" height="26"/>
                                    <View style={styles.headerTexto}>
                                        <Text >Voltar</Text>
                                    </View>
                                </Voltar>
                            <InputArea>

                                <SignInput
                                    IconSvg={HomeIcon}
                                    placeholder="Nome colmeia"
                                    value={nomeColmeia}
                                    onChangeText={t => setNomeColmeia(t)}
                                />

                                <SignInput
                                    IconSvg={LocationIcon}
                                    placeholder="Cidade colmeia"
                                    value={cidade}
                                    onChangeText={t => setCidade(t)}
                                />

                                <Picker
                                selectedValue={ufSelecionado}
                                onValueChange={(itemValue, itemIndex) =>
                                    setUfSelecionado(itemValue)
                                }
                                >
                                <Picker.Item label="Selecione um estado" value="" />
                                {uf.map((item) => { 
                                    return <Picker.Item label={item} value={item} />
                                })}
                                </Picker>

                                <Picker
                                selectedValue={apiarioSelecionado}
                                onValueChange={(itemValue, itemIndex) =>
                                    setApiarioSelecionado(itemValue)
                                }
                                >
                                <Picker.Item label="Selecione um apiário" value="" />
                                {apiarios && apiarios.map((item, i) => { 
                                    return <Picker.Item label={item.nomeApiario} value={item.idApiario} key={i} />
                                })}
                                </Picker>
                            </InputArea>

                            <CustomButton onPress={handleSubmit}>
                                <CustomButtonText>Atualizar colmeia</CustomButtonText>
                            </CustomButton>
                        </Branco>


                    </Scroller >
                </Container >
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    // header: {
    //     marginTop: 15,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     flexDirection:'row',

    // },
    // headerBack: { 
    //     marginLeft: -50
    // },
    container: {
        // backgroundColor: "#000000",
        flex: 1,
        padding: 10
    },
    tableColumnHeader: {
        alignItems: "center",
        backgroundColor: "#1FE0A2",
        flex: 5,
        justifyContent: "center",
        borderRadius: 45
    },
    tableColumnClockInOutTimes: {
        alignItems: "center",
        // backgroundColor: "#000000",
        flex: 3,
        justifyContent: "center",
        margin: 1
    },
    tableColumnTotals: {
        alignItems: "center",
        // backgroundColor: "#000000",
        flex: 2,
        justifyContent: "center",
        margin: 1
    },
    tableRow: {
        flex: 5,
        flexDirection: "row",
        maxHeight: 70,
    },
    tableRowHeader: {
        flex: 5,
        flexDirection: "row",
        maxHeight: 40,
        paddingTop: 10,
        paddingBottom: 10
    },
    tableContainer: {
        // backgroundColor: "#202020",
        borderRadius: 5,
        flex: 1,
        marginTop: 0,
        padding: 10,
        // marginBottom:
        // paddingBottom: 10
    },
    textHeader: {
        color: "#000000",
        fontWeight: "bold"
    },
    textHeaderSubTitle: {
        color: "#000000",
        fontSize: 12
    },
    textLineItem: {
        // flex: 1,
        color: "#000000",
        marginTop: 15,
        marginBottom: 15
    },
    picker: {
        marginVertical: 30,
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderColor: "red",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 25,
        padding: 10,
        top: 1
    },
    limpar: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    Sim: {
        color: 'green'
    },
    Nao: {
        color: 'red'
    },
    selectDefault: {
        fontSize: 10
    },
    Nenhum: {
        color: 'red'
    },
    Baixo: {
        color: 'red'
    },
    Medio: {
        color: '#e5e619'
    },
    Alto: {
        color: 'green'
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    botaoLimpar: {

    },
    labelNome: {
        top: 125,
        left: 60,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelCidade: {
        top: 25,
        left: 60,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});