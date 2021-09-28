export interface User {
    id?: number;
    image?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: number;
    isAuthenticated?: boolean;
    token: string | null;
}
