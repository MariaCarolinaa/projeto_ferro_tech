var knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : 'mysql669.umbler.com',
    port : '41890',
    user : 'adminferrotech',
    password : 'Laboratorio2020',
    database : 'ferrotech'
  }
});

module.exports = knex;