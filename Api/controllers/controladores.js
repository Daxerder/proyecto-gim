const Route = require('express').Router();
const {v4:uuidv4} = require('uuid');
const comprobantes = require('./../models/comprobantes');
const clientes = require('./../models/clientes');
const ventasprod = require('./../models/ventasprod');
const usuarios = require('./../models/usuarios')

//TODOS LOS COMPROBANTES
Route.get('/comprobantes', async (req,res) => {
    comprobantes.allTodo()
    .then(data => {
        res.status(200).json({data});
    })
    .catch(error => {
        res.status(500).json({error});
    });
});
//SUBIR COMPROBANTE
Route.post('/comprobantes', async (req,res) => {
    const ID = uuidv4();
    const {
        tipo_comp,
        comprobante,
        documento,
        //cliente,
        //direccion,
        f_emision,
        f_vencimiento,
        moneda,
        tipo_pago,
        total
    } = req.body;
    
    comprobantes.anadir({
        ID,
        tipo_comp,
        comprobante,
        documento,
        //cliente,
        //direccion,
        f_emision,
        f_vencimiento,
        moneda,
        tipo_pago,
        total
    })
    .then((rowCount, more) => {
        res.status(200).json({
            data: {
                rowCount,
                more,
                ID,
            },
        });
    })
    .catch(error => {
        res.status(500).json({error});
    });
});
//TIPO DE COMPROBANTE FACTURA O BOLETA FILTRO
Route.get('/comprobantes/:tipo_comp',async (req,res) => {
    const {tipo_comp: tipo_comp} = req.params;
    comprobantes.TipoComp(tipo_comp)
    .then(data => {
        if(data.length > 0){
            res.status(200).json({ data: { ...data } });
        }
        else{
            res.status(404).json({ error: 'No se encuentra esta tarea' });
        }
    })
    .catch(error => {
        res.status(500).json({error});
    });
});
/*-----------------------------------------------------------------*/
//SUBIR CLIENTE
Route.post('/clientes', async (req,res) => {
    const {
        id_documento,
        tipo_documento,
        razonsocial,
        direccion
    } = req.body;
    
    clientes.anadir({
        id_documento,
        tipo_documento,
        razonsocial,
        direccion
    })
    .then((rowCount, more) => {
        res.status(200).json({
            data: {
                rowCount,
                more,
                id_documento,
            },
        });
    })
    .catch(error => {
        res.status(500).json({error});
    });
});
//TODOS LOS CLIENTES
Route.get('/clientes', async (req,res) => {
    clientes.allTodo()
    .then(data => {
        res.status(200).json({data});
    })
    .catch(error => {
        res.status(500).json({error});
    });
});
//CONSULTA DE CLIENTE
Route.get('/clientes/:id_documento',async (req,res) => {
    const {id_documento: id_documento} = req.params;
    clientes.Doc_Cliente(id_documento)
    .then(data => {
        if(data.length > 0){
            res.status(200).json({ data: { ...data } });
        }
        else{
            res.status(404).json({ error: 'No se encuentra esta tarea' });
        }
    })
    .catch(error => {
        res.status(500).json({error});
    });
});
/*-----------------------------------------------------------------*/
//SUBIR VENTA
Route.post('/ventasprod', async (req,res) => {
    const ID = uuidv4();
    const {
        id_comprobante,//F001-B001#
        cantidad,
        producto,
        monto
    } = req.body;
    
    ventasprod.anadir({
        ID,
        id_comprobante,//F001-B001#
        cantidad,
        producto,
        monto
    })
    .then((rowCount, more) => {
        res.status(200).json({
            data: {
                rowCount,
                more,
                ID,
            },
        });
    })
    .catch(error => {
        res.status(500).json({error});
    });
});
//TODAS LAS VENTAS
Route.get('/ventasprod', async (req,res) => {
    ventasprod.allTodo()
    .then(data => {
        res.status(200).json({data});
    })
    .catch(error => {
        res.status(500).json({error});
    });
});
//VENTAS POR COMPROBANTE
Route.get('/ventasprod/:id_comprobante',async (req,res) => {
    const {id_comprobante: id_comprobante} = req.params;
    ventasprod.VentasComp(id_comprobante)
    .then(data => {
        if(data.length > 0){
            res.status(200).json({ data: { ...data } });
        }
        else{
            res.status(404).json({ error: 'No se encuentra esta tarea' });
        }
    })
    .catch(error => {
        res.status(500).json({error});
    });
});
//TODOS LOS USUARIOS
Route.get('/usuarios', async (req,res) => {
    usuarios.allTodo()
    .then(data => {
        res.status(200).json({data});
    })
    .catch(error => {
        res.status(500).json({error});
    });
});


//USUARIOS POR ID
Route.get('/usuarios/:id_usuario',async (req,res) => {
    const {id_usuario: id_usuario} = req.params;
    usuarios.id_usuario(id_usuario)
    .then(data => {
        if(data.length > 0){
            res.status(200).json({ data: { ...data } });
        }
        else{
            res.status(404).json({ error: 'No se encuentra esta tarea' });
        }
    })
    .catch(error => {
        res.status(500).json({error});
    });
});

module.exports = Route;