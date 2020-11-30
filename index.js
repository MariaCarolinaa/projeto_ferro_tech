const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/routes')

//definindo quem redenriza o layout
app.set('view engine', 'ejs');

//configurando body-parser para que receba requisições em json
app.use(bodyParser.urlencoded({extends: false}));
app.use(bodyParser.json());

//definindo onde os estarão os arquivos estaticos
app.use(express.static('public'));

//porta de inicio do servidor
const port = process.env.PORT || 3636;


//rotas
app.use('/', router);

//iniciando servidor      
app.listen(port, () => {
    console.log('Umbler listening on port %s', port);
});