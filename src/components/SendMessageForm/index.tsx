import { FormEvent, useContext, useState } from 'react';
import { VscSignOut } from 'react-icons/vsc';
import { AuthContext } from '../../contexts/auth';
import { api } from '../../services/api';
import { SocialAnchor } from '../SocialAnchor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import styles from './style.module.scss';
import badgeSeal from "../../assets/seal.svg";

export function SendMessageForm() {
    const { user, signOut } = useContext(AuthContext);

    const [message, setMessage] = useState('')
    
    async function handleSendMessage(ev: FormEvent) {
        ev.preventDefault();
        
        if(!message.trim()) {
            return toast.error('Falha ao enviar mensagem!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        };

        await api.post('messages', { message });

        setMessage('');
        
        toast.success('Mensagem enviada com sucesso!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    
    return (
        <div className={styles.sendMessageFormWrapper}>
            <button onClick={signOut} className={styles.signOutButton}>
                <VscSignOut size="32" />
            </button>

            <img src={badgeSeal} alt="Badge Build the future" className={styles.badgeSeal} />

            <header className={styles.userInformation}>
                <div className={styles.userImage}>
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>
                <strong className={styles.userName}>{user?.name}</strong>
                <span className={styles.userGithub}>
                    <SocialAnchor userLogin={user?.login} />
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
                <button onClick={handleSendMessage} type='submit'>Enviar mensagem</button>
            </form>
            <ToastContainer newestOnTop pauseOnFocusLoss />
        </div>
    )
}