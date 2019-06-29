var mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.DB_URI || 'localhost',
  database: process.env.DB_NAME || 'ec021_av2_musicfy',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
});

const executar = (strQuery) => {
  return new Promise((resolve, reject) => {
    connection.query(strQuery, (error, rows, fields) => {
      if (error) reject(error);
      resolve(rows);
    });
  });
}

const listarGenero = () => {
  const query = "SELECT * FROM genero;";
  return executar(query);
};

const listarMusicaPorGenero = (id) => {
  const query = `SELECT * FROM musica WHERE genero_id = ${id};`;
  return executar(query);
};

module.exports = {
  listarGenero,
  listarMusicaPorGenero,
};
