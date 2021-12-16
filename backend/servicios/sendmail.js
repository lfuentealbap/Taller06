require('dotenv').config()
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USERMAIL,
      pass: process.env.PASSMAIL
    }
  });

  let mailOptions = {
    from: "alanbrito0820@gmail.com", // sender address
    to: "danielbustos86@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
};




function enviarMail(req,res){
    
    try{
      console.log(process.env.USERMAIL)
 
        let option={
            to: req.body.to,
            subject:req.body.subject,
            text : req.body.text
        }
        transporter.sendMail(option, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
        res.status(200).send({mensaje:'mai enviado'})
    }catch(error)
    {
        res.status(400).send({mensaje:'error'+ error})
    }
 

}




module.exports = {
    enviarMail
    
};