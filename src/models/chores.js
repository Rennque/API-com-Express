const Sequelize = require('sequelize')//[M1S09] Ex 2
const connection = require("../database");

const Place = connection.define('place', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contact: {
        type: Sequelize.STRING 
    },
    opening_hours: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    latitude: {
        type: Sequelize.DECIMAL
    },
    longitude: {
        type: Sequelize.DECIMAL
    }
})

module.exports = Place