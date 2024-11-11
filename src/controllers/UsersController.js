const {hash, compare} = require("bcryptjs");
const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');
const { response } = require("express");

class UsersController {
  // * create - POST para criar um registro.
  async create(request, response) {
    const { name, email, password } = request.body;
    const database = await sqliteConnection();
    
    const checkUsersExists = await database.get(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    
    if (checkUsersExists) {
      throw new AppError('Este e-mail já está em uso');
    }

    const hashPassword = await hash(password,8);

    await database.run("INSERT INTO users(name,email,password) VALUES (?,?,?)",[name,email,hashPassword])

    return response.status(201).json("deu certo");
  }

  async update ( request,response){
    const { name, email,password,old_password } = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = ?", [user_id ]);
    if (!user) {
      throw new AppError('Usuário não encontrado');
      }
      const userWithupdatedEmail = await database.get ("SELECT * FROM users WHERE email = (?)",[email]);
      if (userWithupdatedEmail && userWithupdatedEmail.id !== user.id) {
        throw new AppError('Este e-mail já está em uso');
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if(password && !old_password){
          throw new AppError('Você precisa informar a senha antiga para atualizar a senha');
        }

        if ( password && old_password){
          const checkOldPassword = await compare(old_password,user.password);
          if(!checkOldPassword){
            throw new AppError('Senha antiga não confere');
          }
          user.password = await hash(password,8);
        }
        await database.run(`
          UPDATE users SET
          name =?,
          email=?,
          password = ?,
          updated_at= DATETIME('now')
          WHERE id = ?`, 
          [user.name,user.email,user.password, user_id ]
        );
          return response.status(200).json("atualização feita com sucesso");
  }
}



module.exports = UsersController;