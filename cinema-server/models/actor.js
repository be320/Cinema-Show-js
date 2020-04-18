const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Actor = sequelize.define("actor",{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    image:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Actor;