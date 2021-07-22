const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path')
const handlebars = require('express-handlebars')
const rotaIndex = require('./routes/routeIndex');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 
app.use(morgan('dev'));

const hdbars = handlebars.create({
    defaultLayout: 'main',
    helpers: {
        reverse: function(array){
            return array.reverse()
        }
    }
})
app.engine('handlebars', hdbars.engine)
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname,"public")))

app.use('/', rotaIndex);

app.use((req,res,next) =>{
    const erro = new Error('Não Encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});




module.exports = app;