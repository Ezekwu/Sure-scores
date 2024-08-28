'use client';

import styles from './steps.module.scss';
import CheckMarkSvg from '@/public/assets/icons/CheckMarkSvg';

export type Step = {
  content: string;
  title: string
};

interface Props {
  steps: Step[];
  activeStepIndex: number;
}

export default function Steps({steps, activeStepIndex}:Props) {
  function isActive(index: number) {
    return index === activeStepIndex
  }

  function isCompleted(index: number) {
    return index < activeStepIndex
  }

  return (
    <div className={styles.steps}>
      {steps.map((step, index) => (
        <div key={step.content} className={styles.step}>
          <div
            className={`${styles.indicator} ${isActive(index) || isCompleted(index) ? styles.indicator_active : styles.indicator_inctive}`}
          >
            <div
              className={`${styles.indicator_circle} ${isCompleted(index) && styles.indicator_circle_active}`}
            >
              {isCompleted(index) && <CheckMarkSvg />}
            </div>
            <div className={styles.indicator_line} />
          </div>
          <div
            className={`${styles.content} ${
              isActive(index) || isCompleted(index)
                ? styles.content_active
                : styles.content_inactive
            }`}
          >
            {step.content}
          </div>
        </div>
      ))}
    </div>
  );
}
