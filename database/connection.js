var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'id14935878_ferro',
      password : 'Laboratorio@2020',
      database :  'id14935878_ferrotech'
    }
  });

module.exports = knex;