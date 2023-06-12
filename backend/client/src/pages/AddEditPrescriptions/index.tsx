import React from 'react';
import {
    Text,
    Input,
    Card,

    Icon,
    Button,
    Select,
} from '@chakra-ui/react';

import { FaTimesCircle, FaSave } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { IPrescriptions, IProvider } from '../Provider/types';
import axios from 'axios';

const AddEditPrescriptions = (props: IProvider) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = React.useState<IPrescriptions>({})

    React.useEffect(() => {
        if (location.state) {
            setData({ ...location.state, prescriptionState: location.state.prescriptionState || 'pending' })
        }

    }, [])


    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        let nav = e.currentTarget.value;
        if (props.isPharmacist) nav = '/pharmacist/prescriptions';
        navigate(nav, { state: { _id: location.state.patient } })
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setData({ ...data, [e.currentTarget.name]: e.currentTarget.value })
    };

    let isdisabled = true;
    if (data.prescription && data.dispense && data.providerName && data.providerNumber && data.deaNumber && data.prescriptionState) isdisabled = false;

    const savePrescriptions = () => {
        if (isdisabled) return;
        let url = `/api/prescription/${location.state.patient}/add`;
        let method = 'post'
        if (location.state._id) {
            url = `/api/prescription/${location.state.patient}/${location.state._id}/`;
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
            let nav = '/prescriptions';
            if (props.isPharmacist) nav = '/pharmacist/prescriptions';
            navigate('/prescriptions', { state: { _id: location.state.patient } })
        })
    }

    return (
        <div className='patient-main'>
            <Card >
                <div>
                    <Text mt='10px' mb='5px'>Provider Name:  </Text>
                    <Input
                        name='providerName'
                        value={data.providerName || ''}
                        onChange={handleOnChange}
                        placeholder='John Smith'
                        size='lg'
                        disabled={props.isPharmacist}
                    />
                </div>
                <div>
                    <Text mt='10px' mb='5px'>Provider Number:  </Text>
                    <Input
                        name='providerNumber'
                        value={data.providerNumber || ''}
                        onChange={handleOnChange}
                        placeholder='9171234567'
                        size='lg'
                        disabled={props.isPharmacist}
                    />
                </div>
                <div>
                    <Text mt='10px' mb='5px'>DEA #:  </Text>
                    <Input
                        name='deaNumber'
                        value={data.deaNumber || ''}
                        onChange={handleOnChange}
                        placeholder='1234'
                        size='lg'
                        disabled={props.isPharmacist}
                    />
                </div>
                <div>
                    <Text mt='10px' mb='5px'>Prescription:  </Text>
                    <Input
                        name='prescription'
                        value={data.prescription || ''}
                        onChange={handleOnChange}
                        placeholder='10mg acetaminophen'
                        size='lg'
                        disabled={props.isPharmacist}
                    />
                </div>
                <div>
                    <Text mt='10px' mb='5px'>Dispense:  </Text>
                    <Input
                        name='dispense'
                        value={data.dispense || ''}
                        onChange={handleOnChange}
                        placeholder='no refill'
                        size='lg'
                        disabled={props.isPharmacist}
                    />
                </div>

                <div>
                    <Text mt='10px' mb='5px'>Prescription State:  </Text>
                    <Select
                        name='prescriptionState'
                        value={data.prescriptionState || 'pending'}
                        onChange={(e) => {

                            setData({ ...data, prescriptionState: e.currentTarget.value })

                        }}
                        size='lg'

                    >
                        <option value='pending'>Pending</option>
                        <option value='in progress'>In Progress</option>
                        <option value='filled'>Filled</option>
                    </Select>
                </div>

                <div className='patient-main__actions'>
                    <Button
                        backgroundColor='#d5b2ae'
                        _hover={{ color: '#d5b2ae', backgroundColor: '#273d52' }}
                        value='/prescriptions'
                        onClick={handleOnClick}
                    >
                        <Icon as={FaTimesCircle} />
                    </Button>
                    <Button
                        backgroundColor={isdisabled ? undefined : '#d5b2ae'}
                        _hover={isdisabled ? {} : { color: '#d5b2ae', backgroundColor: '#273d52' }}
                        disabled={isdisabled}
                        onClick={savePrescriptions}
                    >
                        <Icon as={FaSave} />
                    </Button>
                </div>
            </Card>

        </div>
    );
}


export default AddEditPrescriptions;

