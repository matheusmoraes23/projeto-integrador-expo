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
    getApiarios: async (id) => { 
        try { 
            const req = await fetch(`${BASE_API}/v1/apiario`, { 
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idUsuario: id,})
            });

        const json = await req.json();

        return json;

        }catch (error) { 
            console.log(error);
        }
    },
    incluirUsuario: async (dadosIncluir) => { 

        try { 
            const req = await fetch(`${BASE_API}/v1/usuario/incluir`, { 
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nomeUsuario: dadosIncluir.nomeUsuario,emailUsuario: dadosIncluir.emailUsuario, senhaUsuario: dadosIncluir.senhaUsuario})
            });

        const json = await req.json();

        return json;

        }catch (error) { 
            console.log(error);
        }
    },
    incluirManejo: async (dadosIncluir) => { 

        try { 
            const req = await fetch(`${BASE_API}/v1/manejo/incluir`, { 
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idApiario: dadosIncluir.idApiario,idColmeia: dadosIncluir.idColmeia, manejos: dadosIncluir.manejos,  idUsuario: dadosIncluir.idUsuario})
            });

        const json = await req.json();

        return json;

        }catch (error) { 
            console.log(error);
        }
    },
    getColmeias: async (id) => { 
        try { 
            const req = await fetch(`${BASE_API}/v1/colmeia`, { 
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idUsuario: id,})
            });

        const json = await req.json();

        return json;

        }catch (error) { 
            console.log(error);
        }
    },
    incluirColmeia: async (dadosIncluir) => { 

        try { 
            const req = await fetch(`${BASE_API}/v1/colmeia/incluir`, { 
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idUsuario: dadosIncluir.idUsuario,idApiario: dadosIncluir.idApiario,nomeColmeia: dadosIncluir.nomeColmeia,cidade: dadosIncluir.cidade, uf: dadosIncluir.uf})
            });

        const json = await req.json();

        return json;

        }catch (error) { 
            console.log(error);
        }
    },
    getColmeia: async (id) => { 
        try { 
            const req = await fetch(`${BASE_API}/v1/colmeia/obter`, { 
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idColmeia: id,})
            });

        const json = await req.json();

        return json;

        }catch (error) { 
            console.log(error);
        }
    },
    incluirApiario: async (dadosIncluir) => { 

        try { 
            const req = await fetch(`${BASE_API}/v1/apiario/incluir`, { 
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idUsuario: dadosIncluir.idUsuario,nomeApiario: dadosIncluir.nomeApiario,cidade: dadosIncluir.cidade, uf: dadosIncluir.uf})
            });

        const json = await req.json();

        return json;

        }catch (error) { 
            console.log(error);
        }
    },
    getApiario: async (id) => { 
        try { 
            const req = await fetch(`${BASE_API}/v1/apiario/obter`, { 
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idApiario: id,})
            });

        const json = await req.json();

        return json;

        }catch (error) { 
            console.log(error);
        }
    },
    alterarApiario: async (dadosAlterar) => { 

        try { 
            const req = await fetch(`${BASE_API}/v1/apiario/alterar`, { 
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idApiario: dadosAlterar.idApiario,nomeApiario: dadosAlterar.nomeApiario, cidade: dadosAlterar.cidade, uf: dadosAlterar.uf})
            });

        const json = await req.json();

        return json;

        }catch (error) { 
            console.log(error);
        }
    },

    alterarColmeia: async (dadosAlterar) => { 

        try { 
            const req = await fetch(`${BASE_API}/v1/colmeia/alterar`, { 
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idColmeia: dadosAlterar.idColmeia,idUsuario: dadosAlterar.idUsuario,idApiario: dadosAlterar.idApiario,nomeColmeia: dadosAlterar.nomeColmeia, cidade: dadosAlterar.cidade, uf: dadosAlterar.uf})
            });

        const json = await req.json();

        return json;

        }catch (error) { 
            console.log(error);
        }
    },
    getManejos: async (id) => { 
        try { 
            const req = await fetch(`${BASE_API}/v1/manejo`, { 
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idUsuario: id,})
            });

        const json = await req.json();

        return json;

        }catch (error) { 
            console.log(error);
        }
    },
    getManejo: async (id) => { 
        try { 
            const req = await fetch(`${BASE_API}/v1/manejo/obter`, { 
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idManejo: id,})
            });

        const json = await req.json();

        return json;

        }catch (error) { 
            console.log(error);
        }
    },

};