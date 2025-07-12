export interface User {
    id: string;
    email: string;
    username?: string;
    photoUrl?: string;
    createdAt: Date;
    updatedAt: Date;
};

export type RegisterRequest = {
    email: string;
    password: string;
    username: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type UpdateUserRequest = {
    username?: string;
    email: string;
};