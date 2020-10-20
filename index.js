const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const knex = require('./database/connection');

//definindo quem redenriza o layout
app.set('view engine', 'ejs');

//configurando body-parser para que receba requisições em json
app.use(bodyParser.urlencoded({extends: false}));
app.use(bodyParser.json());

//definindo onde os estarão os arquivos estaticos
app.use(express.static('public'));


//rotas
app.get('/', (req, res) => {
    knex.select('*').table('material').then(material => {
        res.render('index', {materiais: material, err: false});
    })
    .catch(err =>{
        console.log(err);
    });
});

app.post('/login', (req, res) => {
    var {login, senha} = req.body;
    knex.select('*').table('usuario').where({login: login}).then(user => {
        if(senha == user[0].senha){
            res.redirect('/perfil');
        }else{
            res.redirect('/');
        }
    }).catch(err => {
        res.redirect('/');
    });
});

app.get('/perfil', (req, res) => {
    res.render('perfil');
});

app.get('/cadastroCompraMateriais', (req, res) => {
    res.render('cadastroCompraMateriais');
});

app.get('/cadastroVendaMateriais', (req, res) => {
    res.render('cadastroVendaMateriais');
});

app.get('/cadastroUsuario', (req, res) => {
    res.render('cadastroUsuario');
});
//... your code here ...
                                
var port = process.env.PORT || 3636;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});