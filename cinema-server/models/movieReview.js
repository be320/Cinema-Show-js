const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const MovieReview = sequelize.define("movieReview",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    body:{
        type: Sequelize.STRING,
        allowNull: false
    },
    rating:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = MovieReview;