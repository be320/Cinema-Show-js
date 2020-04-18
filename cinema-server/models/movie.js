const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Movie = sequelize.define("movie",{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Movie;