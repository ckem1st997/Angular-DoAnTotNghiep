export class User {
    id: number | undefined;
    firstName: string| undefined;
    lastName: string| undefined;
    username: string| undefined;
    role: Role | undefined;
    token?: string;
}
export enum Role {
    User = 'User',
    Admin = 'Admin'
}