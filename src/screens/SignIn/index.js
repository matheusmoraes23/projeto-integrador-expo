import React,  { useState, useContext }  from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../contexts/UserContext';
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
import AbelhaPreLoad   from '../../assets/abelhaPreLoad.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Text, StyleSheet } from "react-native";
import AguaPreLoad from "../../assets/aguaPreLoad.svg";



//import EyeOn from '../../assets/eyeOn.svg'
// import EyeOff from '../../assets/eyeOff.svg'


export default () => {
    //const {dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [ emailField, setEmailField ] = useState('');
    const [ passwordField, setPasswordFild ] = useState('');


    // // let schema = Yup.object().shape({
    // //     email: Yup.string().email( "E-mail1 inválido").required('E-mail é obrigatório'),
    // //     senha: Yup.string().required('Senha é obrigatório')
    // //   });

    const storeData = async (idUsuario) => {
        let idLogado = {idUsuario: idUsuario}
        try {
            const jsonValue = JSON.stringify(idLogado)
            await AsyncStorage.setItem('LOGADO',1);
        } catch (error) {
          // Error saving data
          console.log(error)
        }
      };

    const verificarLogin  = async (dadosValidar) => { 

        let res = await Api.getUsuarioExiste(dadosValidar);
        if(res.request == 400 && res.sucesso == false){ 
            navigation.reset({
                routes: [{name: 'SignUp'}]
            });
        } else { 
            storeData(res.idUsuario).then(() => { 
                navigation.navigate('MainTab')
            })
        }

    }

    const handleMessageButtonClick = () =>{
        navigation.reset({
            routes: [{name: 'SignUp'}]
        });
    }

    const styles = StyleSheet.create({
        titleText: {
          fontSize: 20,
          fontWeight: "bold"
        }
      });

    return (
        <Formik
        initialValues={{ email: '', senha:'' }}
        // validationSchema={schema}
        onSubmit={(values) =>{ 
            // if(emailField != '' &&  passwordField != '') {
            //     const env = { 
            //         emailUsuario: emailField.trim(), 
            //         senhaUsuario: passwordField
            //     }
            //     verificarLogin(env)
            // }
            navigation.navigate('MainTab')
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
        <Container>
            <AguaPreLoad width="100%" height="160" />
            <Text style={styles.titleText}>VISITAS TÉCNICAS</Text>
            <InputArea>

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
                    password={true}
                    onChangeText={t => setPasswordFild(t)}
                />    
                <CustomButton onPress={handleSubmit}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>
 
            <SignMessageButton  onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>



        </Container>
        )}
    </Formik>
    )
}