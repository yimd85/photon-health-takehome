import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Provider from './pages/Provider';
import Prescriptions from './pages/Prescriptions';
import AddEditPatient from './pages/AddEditPatient'

const router = createBrowserRouter(
    createRoutesFromElements(

        <Route path="/" element={<App />}>
            <Route index element={<Login />} />
            <Route path="/provider" element={<Provider />} />
            <Route path="/provider/patient" element={<AddEditPatient />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
            
        </Route>

    )

);

export default router;