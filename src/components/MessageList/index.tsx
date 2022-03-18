import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

import logoImg from '../../assets/logo.svg';

type Message = {
    id: string;
    text: string;
    user: {
        name: string;
        avatar_url: string;
    }
}

export function MessageList() {
    const [ messages, setMessages ] = useState<Message[]>([])
    
    useEffect(() => {
        api.get<Message[]>('messages/last3').then(({ data: message }) => {
            setMessages(message);
        })
    }, [])
    
    return (
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="DoWhile 2021" />

            <ul className={styles.messageList}>
                {
                    messages.map(({ id, text, user: { name, avatar_url }}: Message) => (
                        <li key={id} className={styles.message}>
                            <p className={styles.messageContent}>{text}</p>
                            <div className={styles.messageUser}>
                                <div className={styles.userImage}>
                                    <img src={avatar_url} alt={name} />
                                </div>
                                <span>{name}</span>
                            </div>
                        </li>
                        )
                    )
                }
                
            </ul>
        </div>
    )
}