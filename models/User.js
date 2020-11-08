const knex = require('../database/connection');

class User{

    async findAll(){
        try{
            const users = knex.select('*').table('users');
            return users;
        }catch(err){
            return {msg: 'Erro ao buscar cliente', err};
        }
    }

    async findById(id){
        try{
            const users = knex.select('*').table('users').where({'id_client': id});
            return users;
        }catch(err){
            return {msg: 'Erro ao buscar clientes', err};
        }
    }

    async register(data){
        try{
            await knex.insert(data).table('usuario');
        }catch(err){
            return {msg: 'Erro ao cadastrar usuario', err}
        }
    }

    async findUser(login){
        try{
            const result = await knex.select(['login', 'senha']).table('usuario').where({'login': login});
            return result;
        }catch(err){
            return {msg: 'Erro ao buscar usuario', err};
        }
    }

    
}

module.exports = new User();