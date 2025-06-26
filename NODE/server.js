const pool = require('./db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); //GUARDA O EXPRESS (SERVIDOR "INICIAR SERVIDOR") DENTRO DE UMA VARIÁVEL CHAMADA APP
const port = 3000; //DEFINE A PORTA PADRÃO PARA 3000

app.use(cors()); //PERMITE QUE O HTML ENVIE REQUISIÇÕES PARA O BACK END, CASO CONTRÁRIO ELE É BLOQUEADO
app.use(bodyParser.urlencoded({ extended: true})); //PERMITE O BECKEND LER OS DADOS DA URL
app.use(bodyParser.json()); //DECODIFICA O JSON DAS ROTAS

async function testarConexao() {
  try {
    await pool.getConnection();
    console.log('✅ Conexão com MySQL estabelecida!');
  } catch (err) {
    console.error('❌ Erro ao conectar com o MySQL:', err);
  }
}

testarConexao(); // chama essa função para testar a conexão

//ROTA QUE PEGA TODAS AS INFORMAÇÕES DO FORMULÁRIO DE USUÁRIO
app.post('/enviar-formulario', (req, res) => {
    const dados_usuario = req.body;
    //AS QUERYS EM SQL VÃO AQUI
    res.send('Formulário recebido com sucesso!');
})

//ROTA QUE PEGA TODOS OS DADOS DE FORMULÁRIO DE CADASTRO DE PRODUTO
app.post('/cadastrar-produto', async (req, res) => {
     console.log('Dados recebidos:', req.body);
    const {nome, marca, quantidade} = req.body;
    try{
        await pool.query(
            `INSERT INTO produtos (nome, marca, quantidade)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE
       quantidade = quantidade + VALUES(quantidade)`,
      [nome, marca, quantidade]
    
        );
         res.send('Produto cadastrado com sucesso!');
    }catch (err)
    {
        console.error("Erro ao cadastrar o produto!", err);
        res.status(500).send("Erro ao cadastrar produto!");
    }
       
});

//ROTA QUE PEGA TODOS OS DADOS DE FORMULÁRIO DE SAÍDA DE PRODUTO
app.post('/saida-produto', (req, res) => {
    const saida_produto = req.body;
    //AS QUERYS EM SQL VÃO AQUI
    res.send('Saída registrada com sucesso!');
})

app.get('/pesquisa-produto', (req, res) =>{
    const pesquisa_produto = req.body;
    res.send('Produto retornado!');
})

//ISSO AQUI EU NÃO SEI OQ TA FAZENO
app.listen(port, () => {  
    console.log(`Servidor rodando em http://localhost:${port}`);
})






