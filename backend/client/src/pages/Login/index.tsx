
import { Button } from '@chakra-ui/react';
import { FaPrescriptionBottle, FaClinicMedical } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Login = () => {
    const navigate = useNavigate();
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        navigate(e.currentTarget.value)
    };

    return (
        <div className='login-container'>
            <Button
                backgroundColor='#d5b2ae'
                _hover={{ color: '#d5b2ae', backgroundColor: '#273d52' }}
                rightIcon={<FaClinicMedical />}
                value='provider'
                onClick={handleOnClick}
            >
                I am a Provider
            </Button>
            <Button
                backgroundColor='#d5b2ae'
                _hover={{ color: '#d5b2ae', backgroundColor: '#273d52' }}
                rightIcon={<FaPrescriptionBottle />}
                value='pharmacist'
                onClick={handleOnClick}
            >
                I am a Pharmacist
            </Button>
        </div>
    );
}


export default Login;
