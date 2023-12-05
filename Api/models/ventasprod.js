const execQuery = require('../helpers/execQuery');
const TYPES = require('tedious').TYPES;

const anadir = (dato) => {
    const {
        ID,
        id_comprobante,//F001-B001#
        cantidad,
        producto,
        monto
    } = dato;
    const query = `
        INSERT INTO [dbo].[VentasProd] (ID, id_comprobante, cantidad, producto, monto)
        VALUES (@ID, @id_comprobante, @cantidad, @producto, @monto)
    `;

    const parameters = [
        {name:'ID',type: TYPES.UniqueIdentifier, value:ID},
        {name:'id_comprobante',type: TYPES.VarChar, value:id_comprobante},
        {name:'cantidad',type: TYPES.Int, value:cantidad},
        {name:'producto',type: TYPES.VarChar, value:producto},
        {name:'monto',type: TYPES.Float, value:monto},
    ];
    return execQuery.execWriteCommand(query,parameters);
};

const allTodo = () => {
    const query = `
    SELECT * FROM [dbo].[VentasProd]
    `;
    return execQuery.execReadCommand(query);
};

const VentasComp = (id_comprobante) => {
    const query = `
        SELECT * FROM [dbo].[VentasProd]
        WHERE id_comprobante = @id_comprobante
    `;
    const parameters = [
        {name:'id_comprobante',type: TYPES.VarChar, value: id_comprobante},
    ];

    return execQuery.execReadCommand(query, parameters);
};

module.exports = {
    anadir,
    allTodo,
    VentasComp,
};