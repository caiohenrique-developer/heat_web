import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
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

const messagesQueue: Message[] = [];

const socket = io('http://localhost:4000');

socket.on('new_message', (newMessage: Message) => messagesQueue.push(newMessage));

export function MessageList() {
    const [ messages, setMessages ] = useState<Message[]>([])
    
    useEffect(() => {
        setInterval(() => {
            if(messagesQueue.length > 0) {
                setMessages(prevState => [
                    messagesQueue[0],
                    prevState[0],
                    prevState[1],
                ].filter(Boolean));

                messagesQueue.shift();
            }
        }, 3000)
    }, [])
    
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
                        <li key={id ? id : uuidv4()} className={styles.message}>
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