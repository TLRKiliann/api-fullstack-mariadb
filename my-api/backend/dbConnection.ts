import mariadb from 'mariadb';
import dotenv from 'dotenv';


dotenv.config();
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  //port: process.env.DB_PORT,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_DATABASE
});

module.exports = pool;