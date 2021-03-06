import { useContext } from "react";
import { LoginBox } from "./components/LoginBox";
import { MessageList } from "./components/MessageList";
import { AuthContext } from "./contexts/auth";
import { SendMessageForm } from "./components/SendMessageForm";
import { Footer } from "./components/Footer";

import styles from "./App.module.scss";

export function App() {
  const { user } = useContext(AuthContext);
  
  return (
    <>
      <main className={`${styles.contentWrapper} ${!!user ? styles.userSigned : ''}`}>
        <MessageList />
        { !!user ? <SendMessageForm /> : <LoginBox /> }
      </main>
      <Footer />
    </>
  )
}