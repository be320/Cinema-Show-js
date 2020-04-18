const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const UserLikeMovie = sequelize.define("userLikeMovie",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = UserLikeMovie;