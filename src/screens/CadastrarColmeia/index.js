import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, SafeAreaView, TouchableOpacity, TextInput, View, Platform, RefreshControl, StyleSheet, Text, Button, Alert, ActivityIndicator, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { useNavigation } from '@react-navigation/native';
// import { request, PERMISSIONS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Api from '../../Api';
import api from '../../services/api';

import ComeiaItem from '../../components/ComeiaItem';
import { TouchableNativeFeedback } from 'react-native'
import EmailIcon from '../../assets/email.svg';

import { Formik, FieldArray, } from 'formik';

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
    CustomButton, CustomButtonText
} from './styles';


import SearchIcon from '../../assets/search.svg';
import AdicionarIcon from '../../assets/add.svg';
import Bee from "../../assets/bee 1.svg";


import Icon from 'react-native-vector-icons/Ionicons';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import SignInput from '../../components/SignInput';
Icon.loadFont()




export default ({ route, navigation }) => {
    const { idUsuarioRota } = route.params;
    console.log(idUsuarioRota)


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
                var novo = value != null ? JSON.parse(value) : null;
                if (novo !== null) {
                    // We have data!!
                    // console.log(novo.idUsuario, "value")
                    setIdUsuario(novo.idUsuario);
                }
            } catch (error) {
                console.log(error)
            }
        };

        _retrieveData()
    }, [])

    // useEffect(() => {
    //     console.log(idUsuario)
    //     if (idUsuario != null) {

    //         const verificarApiario = async (idUsuario) => {


    //             let res = await Api.getApiario(idUsuario);

    //             if (res.request == 400 && res.sucesso == false) {
    //                 console.log("não existe apiario")
    //             } else {
    //                 console.log(res)
    //                 console.log("existe apiario")
    //             }

    //         }

    //         verificarApiario()

    //     }
    // }, [idUsuario])



    useEffect(() => {
        // getComeiaApi();
    }, [])


    // const onRefresh = () => {
    //     setRefreshing(false);
    //     getComeias();
    // }

    const [cursos, setCursos] = useState(['Android', 'NodeJs', 'Python', 'PHP', 'Asp'])
    const [cursoSelecionado, setCursoSelecionado] = useState([]);



    const pickerRef = useRef();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    const [text, onChangeText] = useState("Useless Text");



    const salvarColmeia = async (colmeia) => {

        let res = await Api.incluirColmeia(colmeia);

        if (res.request == 200 && res.sucesso == true) {
            // navigation.reset({
            //     routes: [{name: 'SignUp'}]
            // });
            navigation.navigate('MainTab')
        }
    }

    const cadastrarColmeia = {
        nomeColmeia: '',
        cidade: '',
        uf: ''
    }

    const [nomeColmeia, setNomeColmeia] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUF] = useState('');

    return (
        <Formik
            initialValues={cadastrarColmeia}
            // validationSchema={schema}
            onSubmit={(values) => {
                if (nomeColmeia != '' && cidade != '' && uf != '') {
                    const env = {
                        idUsuario: idUsuario,
                        idApiario: 1,
                        nomeColmeia: nomeColmeia.trim(),
                        cidade: cidade.trim(),
                        uf: uf
                    }
                    salvarColmeia(env)
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
                            {/* numberOfLines={2} */}
                            <SearchButton onPress={() => navigation.navigate('Search')}>
                                <SearchIcon width="26" height="26" fill="#FFFFFF" />
                            </SearchButton>
                        </HeaderArea>

                        <Branco>
                            <View>
                                {/* imagem */}
                                {/* testo */}
                            </View>
                            <View style={styles.headerManejo}>
                                <Text>Apiario: teste 1</Text>
                            </View>
                            <InputArea>

                                <SignInput
                                    IconSvg={EmailIcon}
                                    placeholder="Nome colmeia"
                                    value={nomeColmeia}
                                    onChangeText={t => setNomeColmeia(t)}
                                />

                                <SignInput
                                    IconSvg={EmailIcon}
                                    placeholder="Cidade colmeia"
                                    value={cidade}
                                    onChangeText={t => setCidade(t)}
                                />

                                <SignInput
                                    IconSvg={EmailIcon}
                                    placeholder="UF"
                                    value={uf}
                                    password={true}
                                    onChangeText={t => setUF(t)}
                                />
                            </InputArea>

                            {/* </View> */}
                            <CustomButton onPress={handleSubmit}>
                                <CustomButtonText>LOGIN</CustomButtonText>
                            </CustomButton>
                        </Branco>


                    </Scroller >
                </Container >
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    headerManejo: {
        paddingTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
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