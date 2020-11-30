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
                res.redirect('/');
                localStorage.setItem(login, login);  
            }else{
                res.redirect('/');
            }
        }else{
            res.redirect('/');
        }
    }
    
    async new(req, res) {
        const {login, senha} = req.body;
        const dados = {
            login,
            senha
        }
        
        await User.insert(dados);
        res.redirect('/');
    }
}

module.exports = new UserController();