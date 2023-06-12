import React from 'react';
import {
    Text,
    Input,
    Card,

    Icon,
    Button
} from '@chakra-ui/react';
import './styles.css'
import { FaTimesCircle, FaSave } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { IPatients } from '../Provider/types';
import axios from 'axios';

const AddEditPrescriptions = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = React.useState<IPatients>({})

    React.useEffect(() => {
        if (location.state) {
            setData({ ...location.state, dob: new Date(location.state.dob).toISOString().substring(0, 10) })
        }

    }, [])

    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        navigate(e.currentTarget.value)
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value })
    };

    let isdisabled = true;
    if (data.firstName && data.lastName && data.dob && data.phoneNumber) isdisabled = false;

    const savePrescriptions = () => {

        if (isdisabled) return;
        let url = `/api/prescription/${location.state.patient}`;
        let method = 'post'
        if (location.state) {
            url = `/api/cription//${location.state.patient}`;
            method = 'put'
        }
        axios({
            method,
            url,
            data: {
                ...location.state,
                ...data
            }
        }).then(() => {
            navigate('/provider')
        })



    }



    return (
        <div className='patient-main'>
            <Card >

                <div>
                    <Text mt='10px' mb='5px'>First Name:  </Text>
                    <Input
                        name='firstName'
                        value={data.firstName || ''}
                        onChange={handleOnChange}
                        placeholder='John'
                        size='lg'
                    />
                </div>
                <div>
                    <Text mt='10px' mb='5px'>Last Name:  </Text>
                    <Input
                        name='lastName'
                        value={data.lastName || ''}
                        onChange={handleOnChange}
                        placeholder='Smith'
                        size='lg'
                    />
                </div>
                <div>
                    <Text mt='10px' mb='5px'>Date of Birth:  </Text>
                    <Input
                        name='dob'
                        value={data.dob || ''}
                        onChange={handleOnChange}

                        type='date'
                        size='lg'
                    />
                </div>
                <div>
                    <Text mt='10px' mb='5px'>Phone Number:  </Text>
                    <Input
                        name='phoneNumber'
                        value={data.phoneNumber || ''}
                        onChange={handleOnChange}
                        placeholder='9171231234'
                        size='lg'
                    />
                </div>


                <div className='patient-main__actions'>
                    <Button
                        backgroundColor='#d5b2ae'
                        _hover={{ color: '#d5b2ae', backgroundColor: '#273d52' }}
                        value='/provider'
                        onClick={handleOnClick}
                    >
                        <Icon as={FaTimesCircle} />
                    </Button>
                    <Button
                        backgroundColor={isdisabled ? undefined : '#d5b2ae'}
                        _hover={isdisabled ? {} : { color: '#d5b2ae', backgroundColor: '#273d52' }}
                        disabled={isdisabled}
                        onClick={savePatient}
                    >
                        <Icon as={FaSave} />
                    </Button>
                </div>
            </Card>

        </div>
    );
}


export default AddEditPrescriptions;

