const { Pool } = require('pg');

const pool = new Pool({
  user: 'usuario_de_postgres',
  host: 'localhost',
  database: 'nombre_de_tu_basededatos',
  password: 'contraseña_de_postgres',
  port: 5432, 
});

module.exports = pool;
