const config = require("../../../knexfile");
const knex = require("knex");


const connection = knex(config.development);

module.exports = connection;

// // configuração e conexão para o knex que é um programa para atualizar qualquer tipo de banco pq o knex faz a leitura dos comandos
