import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-community/async-storage';
import { Text, StyleSheet } from "react-native";
import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';
import Api from '../../Api'
import SignInput from '../../components/SignInput';
import PersonIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import AbelhaPreLoad from '../../assets/abelhaPreLoad.svg';
import { Formik } from 'formik';
import AguaPreLoad from "../../assets/aguaPreLoad.svg";



// import EyeOn from '../../assets/eyeOn.svg'
// import EyeOff from '../../assets/eyeOff.svg'


export default () => {
    //const {dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordFild] = useState('');


    const handleSignClick = () => {

        navigation.reset({
            routes: [{ name: 'SignIn' }]
        });

        //      01:18:30 DA VIDEO AULA, POR VOLTA AS UMA HORA E MEIA TEM SOBRE O TOKEN 
        //      VERIFICAÇÃO SIMPLES SE OS CAMPOS ESTÃO PREENCHIDOS , SE SIM PASSA O NOME, EMAIL E SENHA
        //      SE SIM PASSA COMO PARAMETRO PARA API, NA API ELE FAZ O FETCH 

        // if (nameField != '' && emailField != '' && passwordField != '') {

        //     let res = await Api.signUp(nameField, emailField, passwordField);

        //     console.log(res);

        // if(res.token){
        // await AsyncStorage.setItem('token', res.token);

        //         userDispatch({
        //             type: 'setAvatar',
        //             payload:{
        //                 avatar: res.data.avatar
        //             }
        //         });

        //         navigation.reset({
        //             routes:[{name: 'MainTab'}]
        //         });
        // }

        //     navigation.reset({
        //         routes: [{ name: 'Preload' }]
        //     });
        // } else {
        //     alert("Preencha os Campos!");
        // }
    }



    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'SignIn' }]
        });
    }

    const styles = StyleSheet.create({
        titleText: {
            fontSize: 20,
            fontWeight: "bold"
        }
    });

    const incluirUsuario  = async (dadosValidar) => { 

        let res = await Api.incluirUsuario(dadosValidar);
        if(res.request == 400 && res.sucesso == false){ 
            navigation.reset({
                routes: [{name: 'SignUp'}]
            });
        } else { 
            navigation.navigate('SignIn')
        }

    }


    return (
        <Formik
            initialValues={{ email: '', senha: '' }}
            // validationSchema={schema}
            onSubmit={(values) => {
                if(emailField != '' &&  passwordField != '' && nameField != '' ) {
                    console.log(nameField,emailField,passwordField )
                    const env = { 
                        emailUsuario: emailField, 
                        senhaUsuario: passwordField,
                        nomeUsuario: nameField
                    }
                    incluirUsuario(env)
                }
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <Container>
                    <AguaPreLoad width="100%" height="160" />
                    <Text style={styles.titleText}>VISITAS TÉCNICAS</Text>
                    <InputArea>

                        <SignInput
                            IconSvg={PersonIcon}
                            placeholder="Digite seu nome"
                            value={nameField}
                            onChangeText={t => setNameField(t)}
                        />

                        <SignInput
                            IconSvg={EmailIcon}
                            placeholder="Digite seu e-mail"
                            value={emailField}
                            onChangeText={t => setEmailField(t)}
                        />

                        <SignInput
                            IconSvg={LockIcon}
                            placeholder="Digite sua senha"
                            value={passwordField}
                            onChangeText={t => setPasswordFild(t)}
                            password={true}
                        />

                        <CustomButton onPress={handleSubmit}>
                            <CustomButtonText>CADASTRAR</CustomButtonText>
                        </CustomButton>
                    </InputArea>

                    <SignMessageButton onPress={handleMessageButtonClick}>
                        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                        <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
                    </SignMessageButton>



                </Container>
            )}
        </Formik>
    )
}