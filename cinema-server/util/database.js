const Sequelize = require('sequelize');

const sequelize = new Sequelize('cinema-show-js','root','',{dialect:'mysql',host:'localhost'});


module.exports = sequelize;