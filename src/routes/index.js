
const { render } = require('ejs');
const fs = require('fs')
const express = require('express')
const router = express.Router()
const client = require('../libs/connect')()

router.get('/', (req,res) => {
    res.render('index')
})

router.get('/registrarUsuario', (req,res) => {
    res.render('reg_usuario')
})

router.get('/registrar', (req,res) => {
    res.render('registrar')
})
router.get('/comprobantes', (req,res) => {
    res.render('comprobante')
})
router.get('/reportes', (req,res) => {
    res.render('reportes')
})

router.post('/insertar', (req, res)=>{
    var c="";
    const Dni = req.body.dni
    client.connect(async (err) =>{
        if (!err){
            const collection = client.db("Gimnasio").collection("usuarios")
            collection.find().toArray((err,result) => {
                var i = 0
                while(i < result.length){
                    if(Dni == result[i].Dni){
                        c = "Error, Usuario ya Registrado";
                        break;
                    }
                    i++;
                }
                if(i==result.length){
                    collection.insertOne( req.body )
                    c = "Usuario Registrado";
                }
                res.render('reg_usuario',{error:c})
                })
        }else{
            console.log("Error")
        }
    })
})

router.post('/autenticar', (req,res) => {
    const dni = req.body.dni;
    const Contrasena = req.body.contrasena;
    var c = "";
    client.connect(async (err) =>{
        if (!err){
            const collection = client.db("Gimnasio").collection("usuarios")
            collection.findOne({dni},(err, result)=>{
                console.log(dni)
                if(!err){
                    if(result==undefined){
                        c = "Usuario no registrado"
                    }else if(Contrasena == result.contrasena){
                        res.render('inicio',{usuario:result.nombre,suscripcion:result.suscripcion})
                    }else{
                        c = "Contraseña Incorrecta"
                    }
                    res.render('index',{error:c})
                }else {
                    console.log("Error")
                }
            })
        }else{
            res.send("resultado:[{'respuesta':'Error al cargar'}, {'mensaje':" + err + "}]")
        }
    })
})

module.exports = router;