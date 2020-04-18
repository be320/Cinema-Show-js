const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const ActorInMovie = sequelize.define("actorInMovie",{
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

module.exports = ActorInMovie;