


export interface IPatients {
    address?: string;
    deleted?: boolean;
    dob?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: number;
    __v?: number;
    _id?: string;
}
 

export interface IPrescriptions {
    prescription: string;
    dispense: string;
    providerName: string;
    providerAddress: string;
    providerNumber: number,
    deaNumber: number,
    patient: string;
    prescriptionState: string;
    __v?: number;
    _id?: string;
}
 