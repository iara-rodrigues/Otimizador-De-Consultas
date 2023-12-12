import { Router } from "express";
import UserController from "./controller/UserController";
import DorController from "./controller/DorController";
import RemedyController from "./controller/RemedyController";
import RegisterMedicineController from "./controller/RegisterMedicineController";
import RegistrarDorController from "./controller/RegistrarDorController";

const routes = Router();

routes.post("/login", UserController.login);
routes.get("/profile", UserController.getProfile);

routes.post("/user", UserController.create);
routes.get("/users", UserController.find);
routes.delete("/deleteUser/:_id", UserController.delete);
routes.patch("/updateUser/:_id", UserController.update);

routes.post("/dor/:userId", DorController.create);
//routes.get("/dores", DorController.find);
routes.get("/dores/:userId", DorController.find);
routes.delete("/deleteDor/:_id", DorController.delete);
routes.patch("/updateDor/:_id", DorController.update);

routes.post("/remedio/:userId", RemedyController.create);
routes.get("/remedios/:userId", RemedyController.find);
routes.delete("/deleteRemedio/:_id", RemedyController.delete);
routes.patch("/updateRemedio/:_id", RemedyController.update);

routes.post("/registrarRemedio/:userId", RegisterMedicineController.create);
routes.get("/registrosRemedio/:userId", RegisterMedicineController.find);
routes.delete("/deleteRegistroremedio/:_id", RegisterMedicineController.delete);
routes.patch("/updateRegistroRemedio/:_id", RegisterMedicineController.update);
routes.get(
  "/estRemedio/:userId/:dataInicio/:dataFinal",
  RegisterMedicineController.findEstatistic
);

routes.post("/registrarDor/:userId", RegistrarDorController.create);
routes.get("/registrosDor/:userId", RegistrarDorController.find);
routes.delete("/deleteRegistroDor/:_id", RegistrarDorController.delete);
routes.patch("/updateRegistroDor/:_id", RegistrarDorController.update);
routes.get(
  "/estDor/:userId/:dataInicio/:dataFinal",
  RegistrarDorController.findEstatistic
);

export default routes;
