const Sequelize = require('sequelize')

const connection = new Sequelize({
    dialect: 'postgres',
    host: 'localhost', 
    username: 'postgres', 
    password: '5432', 
    port:'5432', 
    database: 'vamos_brincar', 
    define: {
      timestamps: true,  
      underscored: true,
      underscoredAll: true,
    },
  })

  module.exports= connection;