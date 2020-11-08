const User = require('../models/User');

class UserController{

    register(req, res){
        res.render('../views/cadastroUsuario');
    }

    async login(req, res){
        const {login, senha} = req.body;
        const result = await User.findUser(login);
        if(result.length > 0){
            if(result[0].senha == senha){
                res.redirect('/perfil');
            }else{
                res.redirect('/');
            }
        }else{
            res.redirect('/cadastro');
        }
    }
}

module.exports = new UserController();