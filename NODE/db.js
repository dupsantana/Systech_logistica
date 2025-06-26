// 1️⃣ Importa o driver MySQL que suporta Promises,
//    permitindo usar async/await nas queries
const mysql = require('mysql2/promise');

// 2️⃣ Cria um “pool” de conexões ao banco de dados
//    — gerencia múltiplas conexões abertas e as reaproveita
const pool = mysql.createPool({
  host: 'localhost',        // 🖥️ Endereço do servidor MySQL (localhost = sua própria máquina)
  user: 'root',             // 👤 Usuário do banco (padrão “root” em dev local)
  password: '',             // 🔐 Senha do usuário (vazia se não tiver senha)
  database: 'systech',    // 📂 Nome do banco de dados que você criou (ex: estoque)
  waitForConnections: true, // ⏳ Se não houver conexão livre, aguardar até liberar
  connectionLimit: 10,      // 🔢 Máximo de conexões simultâneas no pool
  queueLimit: 0             // 📋 Limite de requisições em fila (0 = sem limite)
});

// 3️⃣ Exporta o pool para usar em outros módulos (controllers/routes),
//    assim você não precisa repetir suas credenciais em cada arquivo
module.exports = pool;