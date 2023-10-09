export interface User {
    username: string;
    email: string;
    password: string;
    address: string;
    phone: string;

    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    is_verified?: boolean;
}