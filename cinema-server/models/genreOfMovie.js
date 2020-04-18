const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const GenreOfMovie = sequelize.define("genreOfMovie",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = GenreOfMovie;