const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const TV = sequelize.define("tv",{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    poster:{
        type: Sequelize.STRING,
        allowNull: false
    },
    rating:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    year:{
        type: Sequelize.STRING,
        allowNull: false
    },
    overview:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    trailer:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = TV;