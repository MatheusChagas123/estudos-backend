const AppError = require("../utils/AppError")
class UsersController{
/**
 * cada controller vai ter no máximo 5 métodos ( funções)
 * por exemplo:
   * index - GET para listar vários registros.
   * show - GET para exibir um registro específico.
   * create - POST para criar um registro.
   * update - PUT para atualizar um registro.
   * delete - DELETE para remover um registro.
   */


// * create - POST para criar um registro.
create ( request,response){
  const{name,email,password} = request.body;
  if(!name){
    throw new AppError("faltou digitar o nome!")
  }
  response.status(201).json({name,email,password})
}
}

module.exports = UsersController;