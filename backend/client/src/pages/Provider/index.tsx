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
import { IPatients } from './types';
import { FaTrash, FaPen, FaPlusSquare, FaAddressBook } from "react-icons/fa";
import './styles.css';
import { useNavigate } from 'react-router-dom';


const Provider = () => {
    const [patients, setPatients] = React.useState<IPatients[]>([]);

    React.useEffect(() => {
        axios('/api/patient').then(res => {
            setPatients(res.data)
        });
    }, [])

    const navigate = useNavigate();
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        navigate(e.currentTarget.value)
    };

    const handleDelete = (el: IPatients) => {
        let data = {
            ...el,
            deleted: true
        }
        axios({
            method: 'put',
            url: `/api/patient/${data._id}`,
            data
        }).then(() => {
            let updatePatients = patients.filter(v => v._id !== data._id);
            setPatients(updatePatients)
        });

    }
    return (
        <div className='provider-main'>
            <Tooltip label='Add Patient'>

                <Button
                    backgroundColor='#d5b2ae'
                    _hover={{ color: '#d5b2ae', backgroundColor: '#273d52' }}

                    value='patient'
                    onClick={handleOnClick}
                >
                    <Icon as={FaAddressBook} />
                </Button>
            </Tooltip>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>First Name</Th>
                            <Th>Last Name</Th>
                            <Th>Date of Birth</Th>
                            <Th>Phone Number</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {patients.map(v => {
                            let date = v.dob ? new Date(v.dob).toISOString().substring(0, 10) : null;
                            return (<Tr key={v._id}>
                                <Td>{v.firstName}</Td>
                                <Td>{v.lastName}</Td>
                                <Td>{date}</Td>
                                <Td>{v.phoneNumber}</Td>
                                <Td>
                                    <div className='provider-main__buttons'>

                                        <Tooltip label='Prescriptions'>
                                            <Button
                                                backgroundColor='#d5b2ae'
                                                _hover={{ color: '#d5b2ae', backgroundColor: '#273d52' }}
                                                value='prescriptions'
                                                onClick={(e): void => {
                                                    navigate(`/${e.currentTarget.value}`, { state: v })
                                                }}
                                            >
                                                <Icon as={FaPlusSquare} />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip label='Edit Patient'>
                                            <Button
                                                backgroundColor='#d5b2ae'
                                                _hover={{ color: '#d5b2ae', backgroundColor: '#273d52' }}
                                                value='patient'
                                                onClick={(e): void => {
                                                    navigate(e.currentTarget.value, { state: v })
                                                }}
                                            >
                                                <Icon as={FaPen} />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip label='Delete Patient'>
                                            <Button
                                                backgroundColor='#d5b2ae'
                                                _hover={{ color: '#d5b2ae', backgroundColor: '#273d52' }}

                                                value='pharmacist'
                                                onClick={() => handleDelete(v)}
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


export default Provider;

