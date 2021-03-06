import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type AuthProviderProps = {
    children: ReactNode
}

type User = {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
}

type AuthContextData = {
    user: User | null;
    signInUrl: string;
    signOut(): void;
}

type AuthResponse = {
    token: string;
    user: {
        id: string;
        avatar_url: string;
        name: string;
        login: string;
    }
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    
    const signInUrl = `https://github.com/login/oauth/authorize?client_id=5d2c74df6861a057ac24`;
    
    async function signIn(githubCode: string) {
        const { data: response } = await api.post<AuthResponse>('authenticate', {
            code: githubCode
        })

        const { token, user } = response;

        localStorage.setItem('@DoWhile:token', token);

        api.defaults.headers.common.authorization = `Bearer ${token}`;

        setUser(user);
    }

    function signOut() {
        setUser(null);
        localStorage.removeItem('@DoWhile:token');
    }
    
    useEffect(() => {
        const token = localStorage.getItem('@DoWhile:token');

        if (token) {
            api.defaults.headers.common.authorization = `Bearer ${token}`;
            
            api.get<User>('profile').then(({ data: user }) => {
                setUser(user);
            });
        }
    }, []);

    useEffect(() => {
        const url = window.location.href;
        
        const hasGithubCOde = url.includes('?code=');

        if (hasGithubCOde) {
            const [urlWithoutCode, githubCode] = url.split('?code=');
            
            window.history.pushState({}, '', urlWithoutCode);

            signIn(githubCode);
        }
    }, [])
    
    return (
        <AuthContext.Provider value={{ signInUrl, user, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}