var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'mysql669.umbler.com',
      user : 'adminferrotech',
      password : 'adminferrotech',
      database :  'ferrotech'
    }
  });

module.exports = knex;