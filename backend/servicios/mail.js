'use strict'
require('dotenv').config()
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      // user: process.env.USERMAIL,
      // pass: process.env.PASSMAIL
    }
  });


  //No puede leer si no se ha inicializado el proyecto en el nivel anterior,cambiar credenciales a mano


  let mailOptions = {
    from: "alanbrito0820@gmail.com", // sender address
    to: "danielbustos86@gmail.com", // list of receivers
    subject: "Correo Taller web html", // Subject line
 //  text: "Correo lunes taller web", // plain text body
  html: "<h1>Titulo en html</h1>", // html body
};


  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
  });
 