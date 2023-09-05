import styles from  './AuthLayout.module.scss';

export default function AuthLayout() {
  return (
    <div className={styles.authlayout}> 
      <section className={styles.info}>
        info
      </section>
      <section className={styles.formContainer}>
        form
      </section>
    </div>
  )
} 