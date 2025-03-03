const sql = require('mssql');

const dbConfig = {
  user: 'tu_usuario',  // Tu nombre de usuario de SQL Server
  password: 'tu_contraseña',  // Tu contraseña de SQL Server
  server: 'localhost',  // Dirección del servidor SQL
  database: 'barberia',  // Nombre de la base de datos
  options: {
    encrypt: true,  // Usado para conexiones en Azure
    trustServerCertificate: true  // Habilitar si estás en un entorno de desarrollo
  }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log("Conexión exitosa a la base de datos");
    return pool;
  })
  .catch(err => {
    console.error("Error en la conexión a la base de datos", err);
    process.exit(1);
  });

module.exports = {
  poolPromise,
  sql
};
