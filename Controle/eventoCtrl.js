import Evento from "../Modelo/evento.js";

export default class eventoCtrl{

    gravar(requisicao, resposta){

        resposta.type('application/json');

        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const estado = dados.estado;
            const valor = dados.valor;
            const dataEvento = dados.dataEvento;

            if(nome && endereco && cidade && estado && valor && dataEvento){
                const evento = new Evento(0, nome, endereco, cidade, estado, valor, dataEvento);
                evento.gravar().then(()=>{
                    resposta.status(201);
                    resposta.json({
                        "status": true,
                        "mensagem": "Evento gravado com sucesso",
                        "codigo_evento" : evento.codigo
                    })
                }).catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status": false,
                        "mensagem": "Não foi possivel armazenar o evento" + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensage": "Por favor, informe os dados do Evento corretamente."
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensage": "Requisição inválida"
            })
        }
    }

    atualizar(requisicao, resposta){

        resposta.type('application/json');

        if((requisicao.method === "PATCH" || requisicao.method === "PUT") && requisicao.is('application/json')){
            const dados = requisicao.body;
            const codigo = requisicao.params.codigo;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const estado = dados.estado;
            const valor = dados.valor;
            const dataEvento = dados.dataEvento;

            if(codigo && codigo > 0 && nome && endereco && cidade && estado && valor && dataEvento){
                const evento = new Evento(codigo, nome, endereco, cidade, estado, valor, dataEvento);
                evento.atualizar().then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status": true,
                        "mensagem": "Evento atualizado com sucesso"
                    })
                }).catch((erro)=>{
                    resposta.status(500);
                    resposta.json({
                        "status": false,
                        "mensagem": "Não foi possivel atualizar o evento" + erro.message
                    })
                })
            }
            else {
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensage": "Por favor, informe os dados do Evento corretamente."
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensage": "Requisição inválida"
            })
        }
    }

    excluir(requisicao, resposta){

        resposta.type('application/json');

        if(requisicao.method === "DELETE"){
            const codigo = requisicao.params.codigo;
            if(codigo && codigo > 0){
                const evento = new Evento(codigo);
                evento.excluir()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        "status": true,
                        "mensagem": "Evento excluído com sucesso"
                    })
                }).catch((erro)=>{
                    resposta.status(500);
                    resposta.json({
                        "status": false,
                        "mensagem": "Não foi possivel excluir o evento" + erro.message
                    })
                })
            }
            else {
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensage": "Por favor, informe os dados do Evento corretamente."
                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensage": "Requisição inválida"
            })
        }
    }

    consultar(requisicao, resposta){

        resposta.type('application/json');

        if(requisicao.method === "GET"){
            const termoDePesquisa = requisicao.params.termo;
            const evento = new Evento(0);
            evento.consultar(termoDePesquisa)
            .then((eventos)=>{
                resposta.status(200);
                resposta.json(eventos);
            })
            .catch((erro)=>{
                resposta.status(500);
                resposta.json({
                    "status": false,
                    "mensagem": "Não foi possivel consultar os eventos" + erro.message
                })
            })
        }
        else{
            resposta.status(405);
            resposta.json({
                "status":false,
                "mensage": "Requisição inválida"
            })
        }
    }
}