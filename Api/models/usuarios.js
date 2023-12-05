const execQuery = require('../helpers/execQuery');
const TYPES = require('tedious').TYPES;

const id_usuario = (id_user) => {
    const query = `
        SELECT * FROM [dbo].[Usuarios]
        WHERE usuario = @usuario
    `;
    const parameters = [
        {name:'usuario',type: TYPES.VarChar, value: id_user},
    ];

    return execQuery.execReadCommand(query, parameters);
};

const allTodo = () => {
    const query = `
    SELECT * FROM [dbo].[Usuarios]
    `;
    return execQuery.execReadCommand(query);
};

module.exports = {
    id_usuario,
    allTodo
}