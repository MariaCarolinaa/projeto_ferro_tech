const Material = require('../models/Material');

class HomeController{

    async index(req, res){
        const materiais = await Material.findAll();
        res.render('../views/index', {materiais: materiais});
    }

}

module.exports = new HomeController();