export class User {
    id: number | undefined;
    username: string| undefined;
    role: Role | undefined;
    token?: string;
}
export enum Role {
    User = 'User',
    Admin = 'Admin'
}