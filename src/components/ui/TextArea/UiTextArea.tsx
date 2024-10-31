import { useFormContext, FieldError, Merge, FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { useId } from 'react';
import styles from './textarea.module.scss';

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  register: UseFormRegister<{
    [x: string]: any;
  }>; 
}

export default function UiTextArea ({ label, name, error, placeholder, register}: Props) {
  const textAreaId = useId();
  
  return (
    <div className={`${styles.textarea_wrapper} ${error && styles.error}`}>
      <label htmlFor={textAreaId}>{label}</label>
      <textarea
        id={textAreaId}
        placeholder={placeholder}
        {...register(`${name}`)}
        name={name}
      ></textarea>
      {<span className={styles.error__span}>{error && `${error}`}</span>}
    </div>
  );
}