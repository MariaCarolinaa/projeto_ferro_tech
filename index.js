const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const knex = require('./database/connection');
const { render } = require('ejs');

//definindo quem redenriza o layout
app.set('view engine', 'ejs');

//configurando body-parser para que receba requisições em json
app.use(bodyParser.urlencoded({extends: false}));
app.use(bodyParser.json());

//definindo onde os estarão os arquivos estaticos
app.use(express.static('public'));


//rotas
app.get('/', (req, res) => {
    knex.select('*').table('material').limit(9).then(material => {
        res.render('index', {materiais: material, err: false});
    })
    .catch(err =>{
        console.log(err);
    });
});

app.get('/editarMaterial/:id_material', (req, res) => {
    var id_material = req.params.id_material;
    knex.select(['id_material','codigo','nome_material', 'unidade_referencia', 'categoria', 'peso', 'estoque', 'tipo']).table('material').where({"id_material":id_material}).then(response => {
        res.render('editarMaterial', {
            dados: response
        })    
    })
    .catch(err =>{
        console.log(err);
    });
})

app.post('/updateMaterial', (req, res) => {
    var {id_material, codigo, nome_material, unidadeReferencia, categoria, peso, estoque, tipo} = req.body;
    knex.update({
        codigo,
        nome_material,
        unidade_referencia: unidadeReferencia,
        categoria,
        peso,
        estoque,
        tipo
    }).where({id_material:id_material}).table('material').then((response)=>{
        console.log(response);
        res.redirect('/editarMaterial/'+id_material);
    }).catch(err => {
        console.log(err);
        res.redirect('/editarMaterial/'+id_material);
    });
})

app.get('/deleteMaterial/:id_material', (req, res) => {
    var {id_material} = req.params;
    knex.delete().where({id_material:id_material}).table('material').then(()=> {
        res.redirect('/materiais');
    }).catch(err => {
        res.redirect('/materiais');
    })
})

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

app.post('/cadUsuario', (req, res) => {
    var {nomeCompleto, sexoUsuario, dataNascimento, endereco, 
        numeroEndereco, municipio, cep, bairro, celularCliente} = req.body;
    knex("cliente").insert({
        nome_cliente: nomeCompleto,
        sexo_cliente: sexoUsuario,
        data_nascimento_cliente: dataNascimento,
        cep_cliente: cep,
        endereco_cliente: endereco,
        numero_endereco_cliente: numeroEndereco,
        municipio_cliente: municipio,
        bairro_cliente: bairro,
        celular_cliente: celularCliente
    }).then(()=>{
        res.redirect('/perfil');
    }).catch(err => {
        res.redirect("/");
        alert("Não cadastrado");
    });
});

app.post('/cadMaterial', (req, res) => {
    var {codigo, nome, unidadeReferencia, categoria, peso, estoque, tipo} = req.body;
    knex("material").insert({
        codigo,
        nome_material: nome,
        unidade_referencia: unidadeReferencia,
        categoria,
        peso,
        estoque,
        tipo
    }).then(()=>{
        res.redirect('/materiais');
    }).catch(err => {
        res.redirect("/materiais");
        alert("Não cadastrado");
    });
})

app.get('/perfil', (req, res) => {
    res.render('perfil');
});

app.get('/materiais', (req, res) => {
    knex.select('*').table('material').then(material => {
        res.render('materiais', {materiais: material, err: false});
    })
    .catch(err =>{
        console.log(err);
    });
})

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