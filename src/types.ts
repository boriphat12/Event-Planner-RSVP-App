export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
}

export interface EventType {
    id: string;
    title: string;
    description?: string;
    date: string;
    location?: string;
    isPublic: boolean;
    owner: string | User;
    
}