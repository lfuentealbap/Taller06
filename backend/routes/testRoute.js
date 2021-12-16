// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var userController = require('../controllers/testController');
// var autoController = require('../controllers/autoController')

const auth = require('../middlewares/auth')

// Llamamos al router
var api = express.Router();
 
//  Guardar usuario
api.post('/test', function respuesta(req,res){

    res.status(200).send({mensaje:'recibido'})
});

//api.post('/privada',auth.isAuth,userController.validaVigenciaUsuario);

// api.post('/autoguardar',autoController.guardar);

// Exportamos la confi,guración
module.exports = api;
