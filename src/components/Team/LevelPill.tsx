import styles from './levelpill.module.scss';

interface Props {
  level: string;
}

export default function LevelPill({level}:Props) {
  return <span className={styles.levelPill}>{level}</span>;
}

