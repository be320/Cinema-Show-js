const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const ActorInTV = sequelize.define("actorInTV",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    rolename:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = ActorInTV;