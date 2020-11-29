const { innerJoin } = require('../database/connection');
const knex = require('../database/connection');

class Material {

    async findAll(){
        try{
            const materials = knex.select(['m.id_material', 'm.codigo_material', 'm.nome_material', 'm.peso', 'm.estoque'
                ,'tm.tipo', 'tm.unidade_referencia', 'tm.preco']).from({m: 'material'})
                    .innerJoin({tm: 'tipo_material'}, 'm.tipo', 'tm.id_tipo');
            return materials;
        }catch(err){
            return {msg: 'Erro ao buscar materiais', err};
        }
    }

    async findById(id){
        try{
            const materials = knex.select(['m.id_material', 'm.codigo_material', 'm.nome_material', 'm.peso', 'm.estoque'
            ,'tm.tipo', 'tm.unidade_referencia', 'tm.preco']).from({m: 'material'})
                .innerJoin({tm: 'tipo_material'}, 'm.tipo', 'tm.id_tipo').where({'id_material': id});
            return materials;
        }catch(err){
            return {msg: 'Erro ao buscar materiais', err};
        }
    }

    async findTypeMaterials(){
        try{
            const materials = knex.select(['id_tipo','tipo', 'preco', 'unidade_referencia']).table('tipo_material').groupBy('tipo');
            return materials;
        }catch(err){
            return {msg: 'Erro ao buscar materiais', err};
        }
    }

    async create(material){
        try{
            const {tipo_material, ...dados} = material;
            const result = await knex.transaction(async trx => {
                const id = await knex.insert(tipo_material).table('tipo_material').transacting(trx);
                await knex.insert({...dados, tipo: id}).table('material').transacting(trx);
            }); 
            return result;
        }catch(err){
            return {msg: 'Erro ao cadastrar material', err};
        }
    }

    async update(material, id_material){
        try{
            const {tipo_material, ...dados} = material;
            await knex.transaction(async trx => {
                await knex.update(dados).table('material').where({'id_material': id_material}).transacting(trx);
                await knex.update(tipo_material).table('tipo_material').where({'id_tipo': id_material}).transacting(trx);
            }); 
        }catch(err){

            if(){
                
            }
            console.log(err);
            return {msg: 'Erro ao atualizar', err};
        }
    }

    async delete(id){
        try{
            await knex.transaction(async trx => {
                await knex.delete().table('material').where({'id_material': id}).transacting(trx);
                await knex.delete().table('tipo_material').where({'id_tipo': id}).transacting(trx);
            }); 
           
        }catch(err){
            return {msg: 'Erro ao atualizar', err};
        }
    }

}

module.exports = new Material();