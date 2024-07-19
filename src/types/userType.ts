export type UserType = {
    id:string;
    name: string;
    language: string;
    bio: string;
    version: number
}

export type UserTypeUpdate = {
    name?: string;
    language?: string;
    bio?: string;
    version?: number
}

export type NewUserType = {
    name: string;
    language: string;
    bio: string;
    version: number
}