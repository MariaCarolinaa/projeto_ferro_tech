const Material = require("../models/Material");
const localStorage = require('localStorage');

class HomeController {
  async index(req, res) {
    const materiais = await Material.findAll();
    res.render("../views/index", { login: localStorage.getItem('login'), materiais });
  }
}



module.exports = new HomeController();
