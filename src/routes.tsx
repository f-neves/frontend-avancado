import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Hospitals from './pages/Hospitals';
import Transfers from './pages/Transfers';
import RegisterPatients from './pages/RegisterPatients';
import RegisterTransfers from './pages/RegisterTransfers';
import RegisterDoctor from './pages/RegisterDoctor';
import RegisterHospital from './pages/RegisterHospital';
import EditPatients from './pages/EditPatients';

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "pacientes",
    element: <Patients/>,
  },
  {
    path: "hospitais",
    element: <Hospitals/>,
  },
  {
    path: "transferencias",
    element: <Transfers/>,
  },
  {
    path: "medicos",
    element: <Doctors/>,
  },
  {
    path: "/cadastro-pacientes",
    element: <RegisterPatients/>,
  },
  {
    path: "/editar-pacientes",
    element: <EditPatients/>,
  },
  {
    path: "/cadastro-transferencias",
    element: <RegisterTransfers/>,
  },
  {
    path: "/cadastro-medicos",
    element: <RegisterDoctor/>,
  },
  {
    path: "/cadastro-hospitais",
    element: <RegisterHospital/>,
  },
]);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
