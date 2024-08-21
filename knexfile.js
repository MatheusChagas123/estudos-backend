
const path = require("path");
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname,"src","database","database.db")
    }, 
    // função pool habilita a exclusão em cascata pq no squil3 não é habilitado por padrão 
    pool:{
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_Keys = ON",cb)
    } , 
    migrations:{
      directory: path.resolve(__dirname,"src","database","knex","migrations")
    },
    useNullAsDefault:true
  },  
};
