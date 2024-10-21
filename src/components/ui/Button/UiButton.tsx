"use client" ;
import styles from './button.module.scss'

type ButtonVariant = 'primary' | 'primary-text' | 'secondary' | 'grey' | 'purple' | 'green' |'red' | 'white' | 'danger-secondary' | 'light-blue' | 'egg-plant'
type WeightVariant = 'normal' | 'semi-bold' | 'bold';
type Size = 'normal' | 'icon'

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  type?: 'submit' | 'button';
  variant?: ButtonVariant;
  weightVariant?: WeightVariant;
  size?: Size
  onClick?: (e?: any) => void;
}

export default function UiButton({ 
  children,
  type = 'submit',
  disabled= false, 
  variant = 'primary',
  size = 'normal',
  weightVariant = 'normal',
  loading= false, 
  onClick,
} : Props) {
  const classNames = `${styles.button} ${styles[variant]} ${styles[`font-${weightVariant}`]} ${styles[size]}`;

  return (
    <button className={classNames} type={type} onClick={onClick}>
      {loading ? <p>loading...</p> : children}
    </button>
  );
}