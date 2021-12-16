'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var mail = require("../servicios/sendmail")
// var autoController = require('../controllers/autoController');
// Llamamos al router
var api = express.Router();
 
//  Guardar Persona
api.post('/mail',mail.enviarMail);



// api.post('/autoguardar',autoController.guardar);

// Exportamos la confi,guración
module.exports = api;
