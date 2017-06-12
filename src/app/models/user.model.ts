export interface IUser {
    user: UserModel;
    fetch: boolean;
    fetched: boolean;
    errors: any;
}

export interface UserModel {
    email: string;
    password: string;
}

export class UserStateModel {
    id: number;
    email: string;  
}