import Image from 'next/image';
import styles from  './AuthLayout.module.scss';
import logo from '../../../public/assets/svg/logo.svg';
import illustration from '../../../public/assets/svg/Illustration.svg';


export default function AuthLayout({ 
  children,
}: {
  children: React.ReactNode
}) {
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
          {children}
        </div>
      </section>
    </div>
  )
} 