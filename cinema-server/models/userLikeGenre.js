const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const UserLikeGenre = sequelize.define("userLikeGenre",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = UserLikeGenre;