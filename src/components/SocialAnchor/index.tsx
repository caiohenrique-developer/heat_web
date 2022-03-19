import { VscGithubInverted } from "react-icons/vsc";

import styles from './style.module.scss'

type SocialAnchorProps = {
    userLogin: string | undefined;
    restUrl?: string;
}

export function SocialAnchor({ userLogin, restUrl = '' }: SocialAnchorProps) {
    return (
        <a
            href={`https://github.com/${userLogin}/${restUrl}`}
            target='_blank'
            rel='noreferrer'
            className={styles.socialAnchor}
        >
            <VscGithubInverted size="16" />
            {userLogin}
        </a>
    )
}