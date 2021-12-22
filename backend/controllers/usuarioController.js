'use strict'
const bcrypt = require('bcrypt-nodejs')
// AQUI Cargamos el modelo para usarlo posteriormente en la siguiente clase
var Usuario = require('../modelos/usuario.js');
const servicio = require('../servicios/index')

function guardar(req, res) {

    // Devolvemos una respuesta en JSON

    let User = new Usuario();

    User.nombre = req.body.usuario;
    User.mail = req.body.mail;
    User.pass = req.body.pass;
    User.activo = req.body.activo;


    User.save((err, usuariorstore) => {

        if (err) res.status(500).send(`Error base de datos> ${err}`)

        res.status(200).send({ "mensaje": "creado correctamente", 'usuario': usuariorstore })

    })
}

function validar(req, res) {


    var password = req.body.pass;


    Usuario.findOne({'mail': req.body.mail}, (err, user) => {
        if (err) return res.status(500).send({ mensaje: 'error al realizar la peticion' })
        if (!user) return res.status(401).send({ mensaje: 'Error usuario no existe' })


        bcrypt.compare(password, user.pass, function(error, isMatch) {
            if (error) {
                res.status(500).send(`Error al validar usuario> ${error}`)
            } else if (!isMatch) {
                res.status(401).send({ 'mensaje':'incorrecto'})
            } else {
                res.status(200).send({ 'mensaje':'correcto','token':servicio.createToken(user)})

            }
          })
    })

 


}

function todos(req, res) {
    Usuario.find({}, (err, usuario) => {
        if (err) return res.status(500).send({ message: 'error al realizar la peticion' })
        if (!usuario) return res.status(404).send({ message: 'Error la persona no existe' })

        res.status(200).send({ usuario })
    })

}

const validaVigenciaUsuario = (req,res) =>{


    Usuario.findById(req.user, function (err, usuario) {
        if (err) return res.status(401).send({'mensaje':'usuario no autorizado'})

        return  res.status(200).send({'usuario':usuario.mail});
    });
 
}
//modifica un usuario por id, no se considera contraseña por estar encriptado
function editar(req, res){

    let idUsuario = req.body.id
    let nombre = req.body.nombre
    let mail = req.body.mail
    let activo = req.body.activo

    console.log(req.body)

    Usuario.findByIdAndUpdate(idUsuario, {nombre: nombre, mail:mail, activo: activo}, (err, usuario)=> {
        if(err) res.status(500).send('Internal Error');

        if(!usuario) res.status(404).send('Not Found');

        res.status(200).send({
            message: 'Usuario editado Correctamente',
            data: usuario
        });
    })
}



module.exports = {
    guardar,
    todos,
    validar,
    validaVigenciaUsuario,
    editar

};
