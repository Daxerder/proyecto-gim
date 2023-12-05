const execQuery = require('../helpers/execQuery');
const TYPES = require('tedious').TYPES;

//Subir cliente
const anadir = (dato) => {
    const {
        id_documento,
        tipo_documento,
        razonsocial,//RAZON SOCIAL
        direccion
    } = dato;
    const query = `
        INSERT INTO [dbo].[Clientes] (id_documento, tipo_documento, razonsocial, direccion)
        VALUES (@id_documento, @tipo_documento, @razonsocial, @direccion)
    `;

    const parameters = [
        {name:'id_documento',type: TYPES.VarChar, value:id_documento},
        {name:'tipo_documento',type: TYPES.VarChar, value:tipo_documento},
        {name:'razonsocial',type: TYPES.VarChar, value:razonsocial},
        {name:'direccion',type: TYPES.VarChar, value:direccion},
    ];
    return execQuery.execWriteCommand(query,parameters);
};

//Todos los clientes
const allTodo = () => {
    const query = `
    SELECT * FROM [dbo].[Clientes]
    `;
    return execQuery.execReadCommand(query);
};

//cliente en especifico
const Doc_Cliente = (id_documento) => {
    const query = `
        SELECT * FROM [dbo].[Clientes]
        WHERE id_documento = @id_documento
    `;
    const parameters = [
        {name:'id_documento',type: TYPES.VarChar, value: id_documento},
    ];

    return execQuery.execReadCommand(query, parameters);
};

module.exports = {
    anadir,
    allTodo,
    Doc_Cliente,
};