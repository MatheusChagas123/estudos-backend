
const path = require("path")
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__,"src","database","database.db")
    },
    aseNullAsDeafault : true
  }

  
};
