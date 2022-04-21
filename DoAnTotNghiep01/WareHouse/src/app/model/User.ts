export class User {
    id: string | undefined;
    username: string| undefined;
    role: number | undefined;
    token?: string;
}
export enum Role {
    User = 'User',
    Admin = 'Admin'
}