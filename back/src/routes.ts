import { Router } from "express";
import UserController from "./controller/UserController";
import DorController from "./controller/DorController";
import RemedyController from "./controller/RemedyController";
import RegisterMedicineController from "./controller/RegisterMedicineController";
import RegistrarDorController from "./controller/RegistrarDorController";

const routes = Router();

routes.post("/user", UserController.create);
routes.get("/users", UserController.find);
routes.delete("/deleteUser/:_id", UserController.delete);
routes.patch("/updateUser/:_id", UserController.update);

routes.post("/dor", DorController.create);
routes.get("/dores", DorController.find);
routes.delete("/deleteDor/:_id", DorController.delete);
routes.patch("/updateDor/:_id", DorController.update);

routes.post("/remedio", RemedyController.create);
routes.get("/remedios", RemedyController.find);
routes.delete("/deleteRemedio/:_id", RemedyController.delete);
routes.patch("/updateRemedio/:_id", RemedyController.update);

routes.post("/registrarRemedio", RegisterMedicineController.create);
routes.get("/registrosRemedio", RegisterMedicineController.find);
routes.delete("/deleteRegistroremedio/:_id", RegisterMedicineController.delete);
routes.patch("/updateRegistroRemedio/:_id", RegisterMedicineController.update);
routes.get(
  "/estRemedio/:dataInicio/:dataFinal",
  RegisterMedicineController.findEstatistic
);

routes.post("/registrarDor", RegistrarDorController.create);
routes.get("/registrosDor", RegistrarDorController.find);
routes.delete("/deleteRegistroDor/:_id", RegistrarDorController.delete);
routes.patch("/updateRegistroDor/:_id", RegistrarDorController.update);
routes.get(
  "/estDor/:dataInicio/:dataFinal",
  RegistrarDorController.findEstatistic
);

export default routes;
