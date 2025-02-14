require('dotenv').config();
const { Sequelize } = require ("sequelize");

const sequelize = new Sequelize({
  dialect: 'mssql',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: true
  }
});


const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};


module.exports = {
  connectDB
};
