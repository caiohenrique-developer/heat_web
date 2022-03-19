import { SocialAnchor } from '../SocialAnchor';
import styles from './style.module.scss';

export const Footer = (): JSX.Element => {
  const appCreatedAt = new Date('2022-03-18').getFullYear();
  const currentYear = new Date().getFullYear();
  const year = currentYear > appCreatedAt ? `${appCreatedAt} - ${currentYear}` : currentYear;

  return (
    <>
      <footer className={styles.appFooter}>
        <p>
          Copyright &copy; {year} DoWhile 🚀 2021, done with ☕ by:{' '}
            <SocialAnchor userLogin="caiohenrique-developer" restUrl="heat_web" />
          .
        </p>
      </footer>
    </>
  );
};