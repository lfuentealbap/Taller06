
require('dotenv').config()
var Usuario = require('../modelos/usuario.js');
const test = (req,res) =>{
    const secret = process.env.SECRET_TOKEN;

    Usuario.findById(req.user, function (err, usuario) {

        return  res.status(200).send({'usuario':usuario.mail});
    });
 
}


module.exports = {
    test
    
};