import React from 'react';
import {
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Icon,
    Tooltip,
} from '@chakra-ui/react';
import axios from 'axios';
import { IPrescriptions, IProvider } from '../Provider/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTrash, FaPen, FaPlusSquare, FaAddressBook } from "react-icons/fa";


const Prescriptions = (props: IProvider) => {
    const location = useLocation();
    const [prescriptions, setPrescriptions] = React.useState<IPrescriptions[]>([]);

    React.useEffect(() => {
        axios(`/api/prescription/${location.state._id}`).then(res => {
            setPrescriptions(res.data)
        });
    }, [])

    const navigate = useNavigate();


    const handleDelete = (el: IPrescriptions) => {
        let data = {
            ...el,
            deleted: true
        }


        axios({
            method: 'put',
            url: `/api/prescription/${location.state.patient}/${data._id}`,
            data
        }).then(() => {
            let updatedPrescriptions = prescriptions.filter(v => v._id !== data._id);
            setPrescriptions(updatedPrescriptions)
        });

    }
    console.log(props)
    return (
        <div className='provider-main'>
            <Tooltip label='Add Prescription'>

                <Button
                    backgroundColor={props.isPharmacist ? undefined : '#d5b2ae'}
                    _hover={props.isPharmacist ? {} : { color: '#d5b2ae', backgroundColor: '#273d52' }}
                    disabled={props.isPharmacist}
                    value='update'
                    onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
                        if(props.isPharmacist) return;
                        navigate(e.currentTarget.value, {
                            state: {
                                patient: location.state._id
                            }
                        })

                    }}
                >
                    <Icon as={FaPlusSquare} />
                </Button>
            </Tooltip>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Provider Name</Th>
                            <Th>Provider Number</Th>
                            <Th>DEA #</Th>
                            <Th>Prescription</Th>
                            <Th>Dispense</Th>
                            <Th>Prescription State</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {prescriptions.map((v, i) => {

                            return (<Tr key={v._id}>
                                <Td>{v.providerName}</Td>
                                <Td>{v.providerNumber}</Td>
                                <Td>{v.deaNumber}</Td>
                                <Td>{v.prescription}</Td>
                                <Td>{v.dispense}</Td>
                                <Td>{v.prescriptionState}</Td>
                                <Td>
                                    <div className='provider-main__buttons'>


                                        <Tooltip label='Edit Prescription'>
                                            <Button
                                                backgroundColor='#d5b2ae'
                                                _hover={{ color: '#d5b2ae', backgroundColor: '#273d52' }}
                                                value='update'
                                                onClick={(e): void => {
                                                    
                                                    navigate(e.currentTarget.value, { state: v })
                                                }}
                                            >
                                                <Icon as={FaPen} />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip label='Delete Prescription'>
                                            <Button
                                                backgroundColor={props.isPharmacist ? undefined : '#d5b2ae'}
                                                _hover={props.isPharmacist ? {} : { color: '#d5b2ae', backgroundColor: '#273d52' }}
                                                disabled={props.isPharmacist}

                                                value='pharmacist'
                                                onClick={() => {
                                                    if(props.isPharmacist) return;
                                                    handleDelete(v)
                                                }}
                                            >
                                                <Icon as={FaTrash} />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                </Td>
                            </Tr>)
                        })}

                    </Tbody>

                </Table>
            </TableContainer>
        </div>
    );
}


export default Prescriptions;

