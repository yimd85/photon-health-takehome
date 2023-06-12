import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Provider from './pages/Provider';
import Prescriptions from './pages/Prescriptions';
import AddEditPatient from './pages/AddEditPatient';
import AddEditPrescriptions from './pages/AddEditPrescriptions';


const router = createBrowserRouter(
    createRoutesFromElements(

        <Route path="/" element={<App />}>
            <Route index element={<Login />} />
            <Route path="/provider" element={<Provider />} />
            <Route path="/provider/patient" element={<AddEditPatient />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
            <Route path="/prescriptions/update" element={<AddEditPrescriptions />} />
            <Route path="/pharmacist" element={<Provider isPharmacist={true} />} />
            <Route path="/pharmacist/prescriptions" element={<Prescriptions isPharmacist={true} />} />
            <Route path="/pharmacist/prescriptions/update" element={<AddEditPrescriptions isPharmacist={true} />} />
        </Route>

    )

);

export default router;