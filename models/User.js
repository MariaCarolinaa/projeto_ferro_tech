const knex = require('../database/connection');

class User{

    async findAll(){
        try{
            const users = knex.select('*').table('usuario');
            return users;
        }catch(err){
            return {msg: 'Erro ao buscar cliente', err};
        }
    }

    async findById(id){
        try{
            const users = knex.select('*').table('usuario').where({'id_usuario': id});
            return users;
        }catch(err){
            return {msg: 'Erro ao buscar clientes', err};
        }
    }

    async insert(data){
        const {login, senha} = data;
        console.log(data);
        try{
            await knex.insert({
                login,
                senha,
                ativo:'S',
                cd_tipo_usuario:1
            }).table('usuario');
        }catch(err){
            console.log(err);
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