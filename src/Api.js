// para poder pegar o token 
import AsyncStorage from '@react-native-async-storage/async-storage';

// const BASE_API = 'http://10.0.2.2:8080/api';
const BASE_API = 'http://192.168.0.15:8080/api';
// DAQUI PASASRIA PELO AUTH ? 
// CRIAR TOKEN E VALIDAR 

export default {
    checkToken: async (token) => { 
        const req = await fetch(`${BASE_API}/auth/refresh`, { // tem de criar ou adaptar uma e rever o vídeo para entender melhor
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();
        return json;
    },
    signIn: async (email,password) => { 
        const req = await fetch(`${BASE_API}/auth/login`, {  // tem de criar ou adaptar uma
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
        });
        const json = await req.json();
        return json;
    },
    signUp: async (nome, email, senha) =>{
        try { 
        const req = await fetch(`${BASE_API}/usuarioabelha/incluir`, { // tem de arrumar tabela e rota
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nome, email,senha})
        });
        const json = await req.json();
        return json; 
        } catch (error) { 
            console.log(error);
        }
    },
    logout: async () =>{
        try {
        const token = await AsyncStorage.getItem('token'); // pega o token para deslogar
        const req = await fetch(`${BASE_API}/auth/logout`, { // rota para criar
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();
        return json; 
        } catch (error) { 
            console.log(error);
        }
    },
    // quando estiver logado precisa enviar o token junto nas requisição
    // REQUISIÇÃO PARA TRAZER todos
    // let e lng são opcionais 
    // pega todos apiarios 
    getComeias: async () => { 
        try {

        const req = await fetch(`${BASE_API}/comeia/list`, {
            method: 'POST',
            headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filter: {
                    nrComeia:null,
                    situacao:null,
                    idApiario:null
                },
                pageNumber:1,
                pageSize:10,
                sortField:'id',
                sortOrder:'asc'
            })
        }) 
        const json = await req.json();
        return json; 

        } catch (error) { 
            console.log(error);
        }
    },
    // pega apiario individual 
    // é uma rota de obter ??
    // mudar nomes para apiario
    getComeia: async () => { 


        const req = await fetch(`${BASE_API}/comeia/1`);
        const json = await req.json();
        // console.log(json);


          // const req = await fetch(`${BASE_API}/comeia/list`, { 
            //     method: 'POST',

            // });
            // const json = await req.json();
            // return json;

        return json;
    },
    getComeiaApiaa: async (id) => { 
        try { 
            const req = await fetch(`${BASE_API}/comeia/${id}`, { // 
                method: 'GET',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const json = await req.json();
            return json; 
            } catch (error) { 
                console.log(error);
            }
    },
    getUsuarioExiste: async (dadosValidar) => { 

        try { 
            const req = await fetch(`${BASE_API}/v1/usuario/validar`, { 
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({emailUsuario: dadosValidar.emailUsuario, senhaUsuario: dadosValidar.senhaUsuario})
            });
            console.log(req, "reqreq")
        const json = await req.json();

        return json;

        }catch (error) { 
            console.log(error);
        }
    },
    getApiario: async (id) => { 
        try { 
            const req = await fetch(`${BASE_API}/v1/apiario`, { 
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idUsuario: id,})
            });
            console.log(req, "req")
        const json = await req.json();
            console.log(json, "JSON")
        return json;

        }catch (error) { 
            console.log(error);
        }
    },

};