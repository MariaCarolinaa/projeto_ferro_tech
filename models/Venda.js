const knex = require('../database/connection');

class Venda {

    async findNotas(){
        try{
            const notas = await knex.select('*').table('nota').where({tipo_nota: 2});
            return notas;
        }catch(err){
            console.log(err);
        }
    }

    async findMaterials(cod_nota){
        try{
            const materiais = await knex.select('*').table('venda_material').where({cod_nota: cod_nota});
            return materiais;
        }catch(err){
            console.log(err);
        }
    }

    async createNota(materiais ,totalPagar){
        try{
            const result = await knex.transaction(async trx => {
                const id = await knex.insert({numero_nota: 1, total: totalPagar,data_nota: '2020-11-02',fechado: 'S', tipo_nota: 2}).table('nota').transacting(trx);
                for(let i = 0; i < materiais.length; i++){
                    materiais[i].cod_nota = id;
                }
                await knex.insert(materiais).table('venda_material').transacting(trx);
            }); 
            return result;
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = new Venda();