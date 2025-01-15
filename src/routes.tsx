import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Hospitals from './pages/Hospitals';
import Transfers from './pages/Transfers';
import RegisterPatients from './pages/Cadastros/RegisterPatients';
import RegisterTransfers from './pages/Cadastros/RegisterTransfers';
import RegisterDoctor from './pages/Cadastros/RegisterDoctor';
import RegisterHospital from './pages/Cadastros/RegisterHospital';
import EditPatients from './pages/Editar/EditPatients';
import EditTransfers from './pages/Editar/EditTransfers';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="pacientes" element={<Patients />} />
      <Route path="hospitais" element={<Hospitals />} />
      <Route path="transferencias" element={<Transfers />} />
      <Route path="medicos" element={<Doctors />} />
      <Route path="/cadastro-pacientes" element={<RegisterPatients />} />
      <Route path="/editar-pacientes/:id" element={<EditPatients />} />
      <Route path="/cadastro-transferencias" element={<RegisterTransfers />} />
      <Route path="/editar-transferencias/:id" element={<EditTransfers />} />
      <Route path="/cadastro-medicos" element={<RegisterDoctor />} />
      <Route path="/cadastro-hospitais" element={<RegisterHospital />} />
    </Routes>
  );
}

export default AppRoutes;
