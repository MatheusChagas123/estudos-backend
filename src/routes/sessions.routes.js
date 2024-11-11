const {Router} = require ("express");

const SessionsController =require("../controllers/SessionsController");
const sessionsController = new SessionsController(); 

const sesseionRoutes = Router();
sesseionRoutes.post("/",sessionsController.create)
module.exports = sesseionRoutes;