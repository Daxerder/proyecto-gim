const execQuery = require('../helpers/execQuery');
const TYPES = require('tedious').TYPES;

const anadir = (dato) => {
    const {
        ID,
        comprobante,//F001-B001#
        tipo_comp,//Boleta o factura
        documento,//RUC O DNI
        f_emision,
        f_vencimiento,
        moneda,//soles dolar
        tipo_pago,//contado credito
        total,
    } = dato;
    const query = `
        INSERT INTO [dbo].[Comprobantes] (ID, comprobante, tipo_comp, documento, f_emision, f_vencimiento, moneda, tipo_pago, total)
        VALUES (@ID, @comprobante, @tipo_comp, @documento, @f_emision, @f_vencimiento, @moneda, @tipo_pago, @total)
    `;

    const parameters = [
        {name:'ID',type: TYPES.UniqueIdentifier, value:ID},
        {name:'comprobante',type: TYPES.VarChar, value:comprobante},
        {name:'tipo_comp',type: TYPES.VarChar, value:tipo_comp},
        {name:'documento',type: TYPES.VarChar, value:documento},
        //{name:'cliente',type: TYPES.VarChar, value:cliente},
        //{name:'direccion',type: TYPES.VarChar, value:direccion},
        {name:'f_emision',type: TYPES.DateTime, value:f_emision},
        {name:'f_vencimiento',type: TYPES.DateTime, value:f_vencimiento},
        {name:'moneda',type: TYPES.VarChar, value:moneda},
        {name:'tipo_pago',type: TYPES.VarChar, value:tipo_pago},
        {name:'total',type: TYPES.Float, value:total},
    ];
    return execQuery.execWriteCommand(query,parameters);
};

const allTodo = () => {
    const query = `
    SELECT * FROM [dbo].[Comprobantes]
    `;
    return execQuery.execReadCommand(query);
};

const TipoComp = (tipo_comp) => {
    const query = `
        SELECT * FROM [dbo].[Comprobantes]
        WHERE tipo_comp = @tipo_comp
    `;
    const parameters = [
        {name:'tipo_comp',type: TYPES.VarChar, value: tipo_comp},
    ];

    return execQuery.execReadCommand(query, parameters);
};

module.exports = {
    anadir,
    allTodo,
    TipoComp,
};