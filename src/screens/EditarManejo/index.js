import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, TouchableOpacity, TextInput, View, Platform, RefreshControl, StyleSheet, Text, Button, Alert, ActivityIndicator, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Api';
import { Formik, FieldArray } from 'formik';
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
    Voltar
} from './styles';
import SearchIcon from '../../assets/search.svg';
import Bee from "../../assets/bee 1.svg";
import Icon from 'react-native-vector-icons/Ionicons';
import NavPrev from "../../assets/nav_prev.svg";

Icon.loadFont()




export default ({ route }) => {
    const { idManejoRota } = route.params;
    const navigation = useNavigation();
    const [list, setList] = useState([])
    const [idUsuario, setIdUsuario] = useState(null);
    const [manejoEditar, setManejoEditar] = useState(tabela);


    var editar = {
        manejo: []
    }

    useEffect(() => { 
        if(idManejoRota){ 
            _retrieveData = async () => { 
                console.log(idManejoRota, "idManejoRota")
                const obterManejo = async (idManejoRota) => {
                    try {
                        let res = await Api.getManejo(idManejoRota);

                        if (res.request == 400 && res.sucesso == false) {
                            console.log("não existe apiário")
                        } else {
                            for(let i = 0; i < res.manejo.length; i++){ 
                                editar.manejo.push(res.manejo[i])
                            }   
                            console.log(editar, "EDITARR")
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
                obterManejo(idManejoRota)
            }

            _retrieveData()
        }
    },[idManejoRota])

    useEffect(() => {
        _retrieveData = async () => {
            try {
                const value = await AsyncStorage.getItem('LOGADO');
                var novo = value != null ? JSON.parse(value) : null;
                if (novo !== null) {
                    // We have data!!
                    setIdUsuario(novo.idUsuario);
                }
            } catch (error) {
                console.log(error)
            }
        };

        _retrieveData()
    }, [])



    const pickerRef = useRef();


    var tabela = {
        manejos: [
            {
                quadro: 1,
                // possuiRainha: null,
                trabalhoQuadro: null,
                problemaQuadro: null,
                // acaoPosterior: ''
            },
            {
                quadro: 2,
                // possuiRainha: null,
                trabalhoQuadro: null,
                problemaQuadro: null,
                // acaoPosterior: ''
            },
            {
                quadro: 3,
                // possuiRainha: null,
                trabalhoQuadro: null,
                problemaQuadro: null,
                // acaoPosterior: ''
            },
            {
                quadro: 4,
                // possuiRainha: null,
                trabalhoQuadro: null,
                problemaQuadro: null,
                // acaoPosterior: ''
            },
            {
                quadro: 5,
                // possuiRainha: null,
                trabalhoQuadro: null,
                problemaQuadro: null,
                // acaoPosterior: ''
            },
            {
                quadro: 6,
                // possuiRainha: null,
                trabalhoQuadro: null,
                problemaQuadro: null,
                // acaoPosterior: ''
            },
            {
                quadro: 7,
                // possuiRainha: null,
                trabalhoQuadro: null,
                problemaQuadro: null,
                // acaoPosterior: ''
            },
            {
                quadro: 8,
                // possuiRainha: null,
                trabalhoQuadro: null,
                problemaQuadro: null,
                // acaoPosterior: ''
            },
            {
                quadro: 9,
                // possuiRainha: null,
                trabalhoQuadro: null,
                problemaQuadro: null,
                // acaoPosterior: ''
            },
            {
                quadro: 10,
                // possuiRainha: null,
                trabalhoQuadro: null,
                problemaQuadro: null,
                // acaoPosterior: ''
            }
        ]
    }



    const deparaResposta = (valor) => {
        switch (valor) {
            case 'S':
                return <Text style={styles.Sim}>Sim</Text>
            case 'N':
                return <Text style={styles.Nao}>Não</Text>
            case 'NE':
                return <Text style={styles.Nenhum}>Nenhum</Text>
            case 'B':
                return <Text style={styles.Baixo}>Baixo</Text>
            case 'M':
                return <Text style={styles.Medio}>Médio</Text>
            case 'A':
                return <Text style={styles.Alto}>Alto</Text>
            default:
                return '';
        }
    }

    const limparCampo = (setFieldValue, values, index, valor) => {

        if (valor == "T") {
            var cloned = JSON.parse(JSON.stringify(values));
            cloned[index].trabalhoQuadro = null;
            setFieldValue('manejos', cloned);

        } else if (valor == "P") {
            var cloned = JSON.parse(JSON.stringify(values));
            cloned[index].problemaQuadro = null;
            setFieldValue('manejos', cloned);
        }
    }

    const setarField = (setFieldValue, values, index, itemValue, valor) => {
        if (valor == "T") {
            var cloned = JSON.parse(JSON.stringify(values));
            cloned[index].trabalhoQuadro = itemValue;
            setFieldValue('manejos', cloned);

        } else if (valor == "P") {
            var cloned = JSON.parse(JSON.stringify(values));
            cloned[index].problemaQuadro = itemValue;
            setFieldValue('manejos', cloned);
        }

    }

    const salvarManejo  = async (manejo) => { 

        let res = await Api.incluirManejo(manejo);

        if(res.request == 200 && res.sucesso == true){ 
            navigation.navigate('MainTab')
        }
    }

    return (
        <Formik
            initialValues={tabela}
            // validationSchema={schema}
            onSubmit={(values) => {
                const env = { 
                    idApiario: 1,
                    idColmeia: 1,
                    idUsuario: idUsuario,
                    manejos: values 
                }
                console.log(env, "VALORES")
                salvarManejo(env);
                // navigation.navigate('MainTab')
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


                            <Voltar onPress={() => navigation.navigate('ListarManejo')}>
                                    <NavPrev width="26" height="26"/>
                                    <View style={styles.headerTexto}>
                                        <Text >Voltar</Text>
                                    </View>
                            </Voltar>
                            <View style={styles.headerManejo}>
                                <Text>Colmeia: teste 1</Text>
                            </View>
                            <FieldArray name="manejos">
                                {({ insert, remove, push }) => (
                                    <>
                                        {values.manejos && values.manejos.length > 0 &&
                                            values.manejos.map((item, index) => (

                                                <>
                                                    <View style={styles.tableRowHeader} key={index}>
                                                        <View style={styles.tableColumnHeader}>
                                                            <Text style={styles.textHeader}>Quadro: {item.quadro}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={styles.tableRow}>
                                                        <View style={styles.tableRow}>
                                                            <View style={styles.tableColumnClockInOutTimes}>
                                                                <Text style={styles.textLineItem}>Trabalho quadro?</Text>
                                                            </View>
                                                            <View style={styles.tableColumnTotals}>
                                                                <Text style={styles.textLineItem}>
                                                                    {values.manejos[index].trabalhoQuadro == null ?
                                                                        <Picker
                                                                            ref={pickerRef}
                                                                            selectedValue={`manejos.${index}.trabalhoQuadro`}
                                                                            name={`manejos.${index}.trabalhoQuadro`}
                                                                            onValueChange={(itemValue, itemIndex) => {
                                                                                if (itemValue != "0") {
                                                                                    setFieldValue(`manejos.${index}.trabalhoQuadro`, itemValue)
                                                                                    setarField(setFieldValue, values.manejos, index, itemValue, "T")
                                                                                }
                                                                            }
                                                                            }
                                                                            themeVariant='dark'
                                                                            style={styles.picker}
                                                                        >
                                                                            <Picker.Item label="Selecione uma opção" value="0" style={styles.selectDefault} />
                                                                            <Picker.Item label="Nenhum" value="NE" />
                                                                            <Picker.Item label="Baixo" value="B" />
                                                                            <Picker.Item label="Médio" value="M" />
                                                                            <Picker.Item label="Alta" value="A" />
                                                                        </Picker>
                                                                        :
                                                                        <>
                                                                            <View style={styles.limpar}>
                                                                                {deparaResposta(values.manejos[index].trabalhoQuadro)}
                                                                                {/* <TouchableOpacity
                                                                                    onPress={() => { limparCampo(setFieldValue, values.manejos, index, "T") }}
                                                                                > */}
                                                                                                                                                                    <Text 
                                                                                        // style={styles.botaoLimpar}
                                                                                        onPress={() => { limparCampo(setFieldValue, values.manejos, index, "P") }}
                                                                                        >Limpar</Text>
                                                                                {/* </TouchableOpacity> */}
                                                                            </View>
                                                                        </>
                                                                    }
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={styles.separator} />

                                                    <View style={styles.tableRow}>
                                                        <View style={styles.tableRow}>
                                                            <View style={styles.tableColumnClockInOutTimes}>
                                                                <Text style={styles.textLineItem}>Problema quadro?</Text>
                                                            </View>
                                                            <View style={styles.tableColumnTotals}>
                                                                <Text style={styles.textLineItem}>
                                                                    {values.manejos[index].problemaQuadro == null ?
                                                                        <Picker
                                                                            ref={pickerRef}
                                                                            selectedValue={`manejos.${index}.problemaQuadro`}
                                                                            name={`manejos.${index}.problemaQuadro`}
                                                                            onValueChange={(itemValue, itemIndex) => {
                                                                                if (itemValue != "0") {
                                                                                    setFieldValue(`manejos.${index}.problemaQuadro`, itemValue)
                                                                                    setarField(setFieldValue, values.manejos, index, itemValue, "P")
                                                                                }
                                                                            }
                                                                            }
                                                                            themeVariant='dark'
                                                                            style={styles.picker}
                                                                        >
                                                                            <Picker.Item label="Selecione uma opção" value="0" style={styles.selectDefault} />
                                                                            <Picker.Item label="Sim" value="S" />
                                                                            <Picker.Item label="Não" value="N" />
                                                                        </Picker>
                                                                        :
                                                                        <>
                                                                            <View style={styles.limpar}>
                                                                                {deparaResposta(values.manejos[index].problemaQuadro)}
                                                                                {/* <TouchableOpacity
                                                                                    onPress={() => { limparCampo(setFieldValue, values.manejos, index, "P") }}
                                                                                > */}
                                                                                    <Text 
                                                                                        // style={styles.botaoLimpar}
                                                                                        onPress={() => { limparCampo(setFieldValue, values.manejos, index, "P") }}
                                                                                        >Limpar</Text>

                                                                                {/* </TouchableOpacity> */}
                                                                            </View>
                                                                        </>
                                                                    }
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </>
                                            ))}
                                    </>
                                )}

                            </FieldArray>
                            <View style={styles.separator} />
                            <View>
                                <Button
                                    color='#000'
                                    title="Salvar Manejo"
                                    onPress={handleSubmit}

                                />
                            </View>
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
        borderWidth: 1,
        padding: 10,
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
        
    }
});