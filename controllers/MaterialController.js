const Material = require("../models/Material");
const localStorage = require("localStorage");

class MaterialController {
  async renderIndex(req, res) {
    const materiais = await Material.findAll();
    res.render("../views/materiais", {
      login: localStorage.getItem("login"),
      materiais: materiais,
    });
  }

  async renderEdit(req, res) {
    const { id } = req.params;
    const dados = await Material.findById(id);
    res.render("../views/editarMaterial", {
      login: localStorage.getItem("login"),
      dados: dados,
    });
  }

  async new(req, res) {
    const {
      codigo_material,
      nome_material,
      estoque,
      peso,
      tipo,
      unidade_referencia,
      preco,
      usuario_material,
    } = req.body;

    console.log(req.body);
    console.log(usuario_material);

    const dados = {
      codigo_material,
      nome_material,
      estoque,
      peso,
      usuario_material,
      tipo_material: {
        tipo,
        unidade_referencia,
        preco,
      },
    };

    await Material.create(dados);
    res.redirect("/materiais");
  }

  async update(req, res) {
    const {
      id_material,
      codigo_material,
      nome_material,
      estoque,
      peso,
      tipo,
      unidade_referencia,
      preco,
    } = req.body;

    const dados = {
      codigo_material,
      nome_material,
      estoque,
      peso,
      tipo_material: {
        tipo,
        unidade_referencia,
        preco,
      },
    };
    await Material.update(dados, id_material);
    res.redirect("/materiais");
  }

  async delete(req, res) {
    const { id_material } = req.body;
    await Material.delete(id_material);
    res.redirect("/materiais");
  }
}

module.exports = new MaterialController();
