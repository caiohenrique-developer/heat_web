import { FormEvent, useContext, useState } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { AuthContext } from '../../contexts/auth';
import { api } from '../../services/api';
import styles from './style.module.scss';

export function SendMessageForm() {
    const { user, signOut } = useContext(AuthContext);

    const [message, setMessage] = useState('')
    
    async function handleSendMessage(ev: FormEvent) {
        ev.preventDefault();
        
        if(!message.trim()) return;

        await api.post('messages', { message });
    }
    
    return (
        <div className={styles.sendMessageFormWrapper}>
            <button onClick={signOut} className={styles.signOutButton}>
                <VscSignOut size="32" />
            </button>

            <header className={styles.userInformation}>
                <div className={styles.userImage}>
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>
                <strong className={styles.userName}>{user?.name}</strong>
                <span className={styles.userGithub}>
                    <VscGithubInverted size="16" />
                    {user?.login}
                </span>
            </header>

            <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
                <label htmlFor="message">Mensagem</label>
                <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={ev => setMessage(ev.target.value)}
                    placeholder='Qual sua expectativa para o evento?'
                />
                <button type='submit'>Enviar mensagem</button>
            </form>
        </div>
    )
}