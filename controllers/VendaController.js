const Venda = require("../models/Venda");
const Material = require("../models/Material");
const localStorage = require('localStorage');

class VendaController{

    async index(req, res){
        const notas = await Venda.findNotas();
        res.render('../views/vendas', {login: localStorage.getItem('login'),notas: notas});
    }

    async viewDetails(req, res){
        const {id} = req.params;
        const materiais = await Venda.findMaterials(id);
        res.render('../views/vendaDetails', {login: localStorage.getItem('login'),materiais: materiais});
    }

    async renderVenda(req, res){
        const materiais = await Material.findTypeMaterials();
        res.render('../views/cadastroVendaMateriais', {login: localStorage.getItem('login'),materiais: materiais});
    }

    async renderEdit(req, res){
        const {id} = req.params;
        const dados = await Venda.findById(id);
        const materiais = await Material.findTypeMaterials();
        res.render('../views/editarVendas', {login: localStorage.getItem('login'),dados: dados,materiais: materiais});
    }

    async novaVenda(req, res){
        const materiais = req.body; 
        let totalPagar = 0;

        materiais.forEach(item => {
            delete item.id;
            totalPagar = totalPagar + Number(item.total);
        });
        
        await Venda.createNota(materiais, totalPagar);

        res.render('../views/vendas', {login: localStorage.getItem('login'),notas: notas});
    }

    async update(req, res){
        const {id_venda, tipo_material, preco, medida_referencia, peso, total, cod_nota} = req.body;

        const dados = {
            tipo_material,
            preco,
            medida_referencia,
            peso,
            total,
            cod_nota
        }
        await Venda.update(dados, id_venda);
        res.redirect('/vendas');
    }

    async delete(req, res){
        const {cod_nota} = req.body;
        await Venda.deleteNota(cod_nota);
        res.redirect('/vendas');
    }
}

module.exports = new VendaController();