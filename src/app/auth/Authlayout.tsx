'use client';
import Image from 'next/image';
import UiSteps from '@/src/components/ui/Steps/UiSteps';
import UiIcon from '@/src/components/ui/Icon/UiIcon';
import styles from './AuthLayout.module.scss';
import illustration from '@/public/assets/images/Illustration.png';;
import { usePathname } from 'next/navigation';
import { Step } from '@/src/components/ui/Steps/UiSteps';

interface Props {
  children: React.ReactNode;
  steps?: Step[];
  currentStepIndex?: number;
}

export default function AuthLayout({children, steps, currentStepIndex}:Props) {
  const router = usePathname();
  const isSignUpPage = router.includes('signup');
  
  return (
    <div className={styles.authlayout}>
      <div
        className={isSignUpPage ? styles.signUp_wrapper : styles.signIn_wrapper}
      >
        <section className={styles.info}>
          {isSignUpPage ? (
            <div className={styles.info__inner}>
              <div className={styles.info__inner__logo}>
                <UiIcon icon="Logo" size="50" />
              </div>
              <h1 className={styles.info__inner__title}>Get started</h1>
              <UiSteps activeStepIndex={currentStepIndex!} steps={steps!} />
            </div>
          ) : (
            <div className={styles.info__inner}>
              <div className={styles.info__inner__logo}>
                <UiIcon icon="Logo" size="50" />
                <h2>Woorkroom</h2>
              </div>
              <h1 className={styles.info__inner__title}>
                Your place to work <br /> Plan. Create. Control
              </h1>
              <Image
                src={illustration}
                alt="illustration of man planing a project"
              />
            </div>
          )}
        </section>
        <section className={styles.formContainer}>
          <div className={styles.formContainer__inner}>{children}</div>
        </section>
      </div>
    </div>
  );
}
