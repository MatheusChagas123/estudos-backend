
exports.up = knex => knex.schema.createTable("notes",table =>{
table.increments("id");
table.text("title");
table.text("description");
table.integer("user_id").references("id").inTable("users");
table.timestamp("created_at").default(knex.fn.now());
table.timestamp("updated_at").default(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("notes");

// SQL puro
// const createUsers = `
// CREATE TABLE IF NOT EXISTS users (
// id INTEGER PRIMARY KEY AUTOINCREMENT,
// name VARCHAR(255) NOT NULL,
// email VARCHAR(255) NOT NULL UNIQUE,
// password VARCHAR(255) NOT NULL,
// avatar VARCHAR NULL,
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// )`;
// module.exports = createUsers;