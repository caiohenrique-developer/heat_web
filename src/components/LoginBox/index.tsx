import { useEffect } from 'react';
import { VscGithubInverted } from 'react-icons/vsc'
import { api } from '../../services/api';

import styles from './style.module.scss';

type AuthResponse = {
    token: string;
    user: {
        id: string;
        avatar_url: string;
        name: string;
        login: string;
    }
}

export function LoginBox() {
    const signInUrl = `https://github.com/login/oauth/authorize?client_id=5d2c74df6861a057ac24`;
    
    async function signIn(githubCode: string) {
        const { data: response } = await api.post<AuthResponse>('authenticate', {
            code: githubCode
        })

        const { token, user } = response;

        localStorage.setItem('@DoWhile:token', token);

        console.log(user);
    }
    
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
        <div className={styles.loginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href={signInUrl} className={styles.signInWithGithub}>
                <VscGithubInverted size="24" />
                Entrar com GitHub
            </a>
        </div>
    )
}