const Venda = require("../models/Venda");
const Material = require("../models/Material");

class VendaController{

    async index(req, res){
        const notas = await Venda.findNotas();
        res.render('../views/vendas', {notas: notas});
    }

    async viewDetails(req, res){
        const {id} = req.params;
        const materiais = await Venda.findMaterials(id);
        res.render('../views/vendaDetails', {materiais: materiais});
    }

    async renderVenda(req, res){
        const materiais = await Material.findTypeMaterials();
        res.render('../views/cadastroVendaMateriais', {materiais: materiais});
    }

    async novaVenda(req, res){
        const materiais = req.body; 
        let totalPagar = 0;

        materiais.forEach(item => {
            delete item.id;
            totalPagar = totalPagar + Number(item.total);
        });
        
        await Venda.createNota(materiais, totalPagar);

        res.render('../views/vendas', {notas: notas});
    }

}

module.exports = new VendaController();