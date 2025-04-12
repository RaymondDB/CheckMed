const { Sequelize } = require('sequelize');

module.exports = function dbConfig(config) {
  const env = process.env.NODE_ENV || 'development';
  const dbConfig = config[env].database;

  let sequelize;

  if (dbConfig.dialect === 'sqlite') {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: dbConfig.storage || ':memory:',
      logging: config[env].logging ? console.log : false
    });
  } else {
    sequelize = new Sequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        logging: config[env].logging ? console.log : false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      }
    );
  }

  // Test the connection
  (async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

  return sequelize;
};