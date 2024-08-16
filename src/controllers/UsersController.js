const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');

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

    await database.run("INSERT INTO users(name,email,password) VALUES (?,?,?)",[name,email,password])

    return response.status(201).json("deu certo");
  }
}

module.exports = UsersController;
