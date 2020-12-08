const User = require("../models/User");
const Material = require("../models/Material");
const localStorage = require("localStorage");

class UserController {
  register(req, res) {
    res.render("../views/cadastroUsuario", {
      login: localStorage.getItem("login"),
    });
  }

  async login(req, res, next) {
    const { login, senha } = req.body;
    const result = await User.findUser(login);
    if (result.length > 0) {
      if (result[0].senha == senha) {
        localStorage.setItem("login", login);
        const materiais = await Material.findAll();
        res.render("../views/index.ejs", { login, materiais });
      } else {
        res.send({ mensagem: "login e senha invalidos" });
      }
    } else {
      res.send({ mensagem: "login e senha invalidos" });
    }
  }

  async novo(req, res) {
    const { login, senha } = req.body;
    const dados = {
      login,
      senha,
    };

    await User.insert(dados);
    res.redirect("/");
  }

  async logout(req, res) {
    const materiais = await Material.findAll();
    localStorage.removeItem("login");
    res.render("../views/index.ejs", { materiais, login: null });
  }

  acessoNegado(req, res) {
    localStorage.removeItem("login");
    res.render("../views/acessoNegado.ejs", { login: null });
  }
}
module.exports = new UserController();
