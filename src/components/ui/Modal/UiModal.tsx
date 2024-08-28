import React from 'react';
import styles from './modal.module.scss'
import CloseSvg from '@/public/assets/icons/CloseSvg';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
}

export default  function UiModal ({ isOpen, title, closeModal, children} : Props) {
  if (!isOpen) {
    return null
  }
  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={closeModal} />
      <div className={styles.main_wrapper}>
        <div className={styles.main}>
          <div className={styles.wrapper}>
            <header>
              <h2>{title}</h2>
              <button onClick={closeModal}>
                <CloseSvg />
              </button>
            </header>
            <section className={styles.children}>{children}</section>
          </div>
        </div>
      </div>
    </div>
  );
}