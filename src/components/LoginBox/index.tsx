import { VscGithubInverted } from 'react-icons/vsc'

import styles from './style.module.scss';

export function LoginBox() {
    const signInUrl = `https://github.com/login/oauth/authorize?client_id=5d2c74df6861a057ac24`;
    
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