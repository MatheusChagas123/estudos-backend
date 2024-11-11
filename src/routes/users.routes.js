const Router  = require("express"); // importando o Router de dentro do express
const multer = require("multer"); // multer para carregar a imagem
const uploadConfig = require("../configs/upload");

const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UsersAvatarController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router(); // inicializando o Router
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController(); // instanciando (reservando um espaço em memória) a classe
const userAvatarController = new UserAvatarController(); 


usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update); 
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update) 
module.exports = usersRoutes; // exportando as rotas para o server.js utilizar