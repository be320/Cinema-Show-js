const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const UserLikeActor = sequelize.define("userLikeActor",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = UserLikeActor;