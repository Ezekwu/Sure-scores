import Image from 'next/image';
import styles from  './AuthLayout.module.scss';
import logo from '../../../public/assets/svg/logo.svg';
import illustration from '../../../public/assets/svg/Illustration.svg';
import LoginForm from '@/components/auth/LoginForm';


export default function AuthLayout() {
  return (
    <div className={styles.authlayout}> 
      <section className={styles.info}>
        <div className={styles.info__inner}>
          <div className={styles.info__inner__logo}>
            <Image src={logo} alt='company logo'/>
            <h2>Woorkroom</h2>
          </div>
          <h1 className={styles.info__inner__title}>
            Your place to work <br /> Plan. Create. Control
          </h1>
          <Image src={illustration} alt='illustration of man planing a project'/>
        </div>
      
      </section>
      <section className={styles.formContainer}>
        <div className={styles.formContainer__inner}>
          <LoginForm />
        </div>
      </section>
    </div>
  )
} 