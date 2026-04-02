import type { UserRole } from "../../../db/schema.js";

export interface SignupUser {
    firstName: string;
    lastName?: string | null | undefined;
    email: string;
    password: string;
}

export interface SigninUser {
    email: string;
    password: string;
}

export interface AccessTokenPayload{
    id: string;
    role: UserRole;
}

export interface RefrehTokenPayload{
    id: string;
}