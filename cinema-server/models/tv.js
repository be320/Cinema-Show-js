const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const TV = sequelize.define("tv",{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = TV;