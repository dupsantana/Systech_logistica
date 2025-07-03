

const pool = require('./db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); //GUARDA O EXPRESS (SERVIDOR "INICIAR SERVIDOR") DENTRO DE UMA VARIÁVEL CHAMADA APP
const port = 3000; //DEFINE A PORTA PADRÃO PARA 3000

const path = require('path');

// Servir arquivos estáticos (como CSS, JS, imagens, etc) da pasta View/source
app.use(express.static(path.join(__dirname, 'View', 'source')));

// Quando acessar /logistica, renderizar logistica.html
app.get('/logistica', (req, res) => {
  res.sendFile(path.join(__dirname, 'View', 'src', 'logistica.html'));
});


app.use(express.json());
app.use(cors()); //PERMITE QUE O HTML ENVIE REQUISIÇÕES PARA O BACK END, CASO CONTRÁRIO ELE É BLOQUEADO
app.use(bodyParser.urlencoded({ extended: true})); //PERMITE O BECKEND LER OS DADOS DA URL
app.use(bodyParser.json()); //DECODIFICA O JSON DAS ROTAS

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

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
  const { nome, marca, quantidade } = req.body;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Verifica se o produto existe
    const [produtos] = await connection.query(
      'SELECT id FROM produtos WHERE nome = ? AND marca = ?',
      [nome, marca]
    );

    let produtoId;
    if (produtos.length > 0) {
      produtoId = produtos[0].id;
      await connection.query(
        'UPDATE produtos SET quantidade = quantidade + ? WHERE id = ?',
        [quantidade, produtoId]
      );
    } else {
      const [result] = await connection.query(
        'INSERT INTO produtos (nome, marca, quantidade) VALUES (?, ?, ?)',
        [nome, marca, quantidade]
      );
      produtoId = result.insertId;
    }

    // 2. Registra a movimentação corretamente:
    await connection.query(
      'INSERT INTO movimentacoes (produto_id, tipo, quantidade) VALUES (?, ?, ?)',
      [produtoId, 'entrada', quantidade]
    );

    await connection.commit();
    console.log(`Movimentação inserida: produto_id=${produtoId}, quantidade=${quantidade}`);
    res.send('Produto e movimentação registrados com sucesso!');
  }
  catch (err) {
    await connection.rollback();
    console.error("Erro no cadastro:", err);
    res.status(500).send("Erro ao cadastrar produto");
  }
  finally {
    connection.release();
  }
});

//ATUALIZAÇÃO DA TABELA DE CADASTROS
// em server.js, abaixo das outras rotas
app.get('/cadastros', async (req, res) => {
  try {
    // Seleciona só o que foi criado hoje
    const [rows] = await pool.query(
      `SELECT nome, marca, quantidade, criado_em
       FROM produtos
       WHERE DATE(criado_em) = CURRENT_DATE
       ORDER BY criado_em DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar cadastros:', err);
    res.status(500).send('Erro ao buscar cadastros');
  }
});


//SAIDA DE PRODUTOS

app.post('/saida-produto', async (req, res) => {
  const {
    campo_saida_nome: nome,
    campo_saida_marca: marca,
    campo_saida_quantidade: qtdTxt,
    campo_saida_destino: destino
  } = req.body;

  // 1) Validação básica
  const quantidade = parseInt(qtdTxt, 10);
  if (isNaN(quantidade) || quantidade <= 0) {
    return res.status(400).send('Quantidade inválida');
  }
  if (!destino || !nome || !marca) {
    return res.status(400).send('Preencha todos os campos');
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // 2) Buscando produto existente
    const [rows] = await conn.query(
      'SELECT id, quantidade FROM produtos WHERE nome = ? AND marca = ?',
      [nome, marca]
    );
    if (rows.length === 0) {
      throw new Error('Produto não encontrado');
    }
    const { id: produtoId, quantidade: qtdAtual } = rows[0];

    // 3) Checar estoque suficiente
    if (qtdAtual < quantidade) {
      throw new Error('Estoque insuficiente');
    }

    // 4) Atualizar estoque (subtrai)
    await conn.query(
      'UPDATE produtos SET quantidade = quantidade - ? WHERE id = ?',
      [quantidade, produtoId]
    );

    // 5) Registrar na tabela de saídas
    await conn.query(
      `INSERT INTO saidas_produtos
         (produto_id, quantidade, destino)
       VALUES (?, ?, ?)`,
      [produtoId, quantidade, destino]
    );

    await conn.commit();
    console.log(`🛒 Saída: produto_id=${produtoId}, qtde=${quantidade}, destino=${destino}`);
    res.send('Saída registrada com sucesso!');
  } catch (err) {
    await conn.rollback();
    console.error('Erro na saída de produto:', err.message);
    res.status(500).send(err.message);
  } finally {
    conn.release();
  }
});

//TABELA DE SAIDA DE PRODUTOS
app.get('/saidas', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT
         p.nome,
         p.marca,
         s.quantidade,
         s.data_saida AS saida_em,
         s.destino
       FROM saidas_produtos s
       JOIN produtos p ON p.id = s.produto_id
       WHERE DATE(s.data_saida) = CURRENT_DATE
       ORDER BY s.data_saida DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar saídas:', err);
    res.status(500).send('Erro ao buscar saídas');
  }
});





// ROTA DA TABELA DE REGISTROS
// ROTA DA TABELA DE REGISTROS
app.get('/registros', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.nome,
        p.marca,
        p.quantidade       AS quantidade,
        p.criado_em        AS data_movimentacao,
        'CADASTRO'         AS tipo,
        NULL               AS destino
      FROM produtos p

      UNION ALL

      SELECT 
        pr.nome,
        pr.marca,
        -sp.quantidade     AS quantidade,           -- sai como negativo
        sp.data_saida      AS data_movimentacao,
        'SAÍDA'            AS tipo,
        sp.destino
      FROM saidas_produtos sp
      JOIN produtos pr ON pr.id = sp.produto_id

      ORDER BY data_movimentacao DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar registros:', err);
    res.status(500).send('Erro ao buscar registros');
  }
});







app.get('/pesquisa-produto', (req, res) =>{
    const pesquisa_produto = req.body;
    res.send('Produto retornado!');
})

app.get('/estoque', async (req, res) => {
  try {
      const [dados] = await pool.query('SELECT nome, marca, quantidade FROM produtos ORDER BY nome ASC');
      res.json(dados);


  } catch (error) {
    console.error("Erro ao buscar tabela de estoque: ", error);
    res.status(500).send("Erro ao buscar tabela de estoque!");
  }
})

//ISSO AQUI EU NÃO SEI OQ TA FAZENO
app.listen(port, () => {  
    console.log(`Servidor rodando em http://localhost:${port}`);
})






