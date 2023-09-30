export interface User {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;

    username: string;
    email: string;
    password: string;
    address: string;
    phone: string;   
}