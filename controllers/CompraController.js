const Compra = require("../models/Compra");
const Material = require("../models/Material");

class CompraController{

    async index(req, res){
        const notas = await Compra.findNotas();
        res.render('../views/compras', {notas: notas});
    }

    async viewDetails(req, res){
        const {id} = req.params;
        const materiais = await Compra.findMaterials(id);
        res.render('../views/comprasDetails', {materiais: materiais});
    }

    async renderEdit(req, res){
        const {id} = req.params;
        const dados = await Compra.findById(id);
        const materiais = await Material.findTypeMaterials();
        res.render('../views/editarCompras', {dados: dados,materiais: materiais});
    }

    async renderCompra(req, res){
        const materiais = await Material.findTypeMaterials();
        res.render('../views/cadastroCompraMateriais', {materiais: materiais});
    }

    async novaCompra(req, res){
        const materiais = req.body; 
        let totalPagar = 0;

        materiais.forEach(item => {
            delete item.id;
            totalPagar = totalPagar + Number(item.total);
        });

        await Compra.createNota(materiais, totalPagar);
        const notas = await Compra.findNotas();
        res.render('../views/compras');
    }

    async update(req, res){
        const {id_compra, tipo_material, preco, medida_referencia, peso, total, cod_nota} = req.body;

        const dados = {
            tipo_material,
            preco,
            medida_referencia,
            peso,
            total,
            cod_nota
        }
        await Compra.update(dados, id_compra);
        res.redirect('/compras');
    }

    async delete(req, res){
        const {cod_nota} = req.body;
        await Compra.deleteNota(cod_nota);
        res.redirect('/compras');
    }

}

module.exports = new CompraController();