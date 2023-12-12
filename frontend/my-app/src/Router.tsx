import { Routes, Route } from "react-router-dom";
import addMedicine from "./components/addMedicine";
import addPain from "./components/addPain";
import home from "./components/home";
import registerMedicine from "./components/registerMedicine";
import registerPain from "./components/registerPain";
import addUser from "./components/addUser";
import estMedicine from "./components/estMedicine";
import estDor from "./components/estPain";
import Login from "./components/login";

const router = () => {
  return (
    <Routes>
      <Route path="/login" element={Login()} />
      <Route path="/addUser" element={addUser()} />

      <Route path="/" element={home()} />
      <Route path="/addMedicine" element={addMedicine()} />
      <Route path="/addPain" element={addPain()} />
      <Route path="/registerMedicine" element={registerMedicine()} />
      <Route path="/registerPain" element={registerPain()} />
      <Route path="/estMedicine" element={estMedicine()} />
      <Route path="/estDor" element={estDor()} />
    </Routes>
  );
};
export default router;
