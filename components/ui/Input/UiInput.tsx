"use client" ;

import styles from  './input.module.scss'
import { useFormContext, FieldError, Merge, FieldErrorsImpl, UseFormRegister } from 'react-hook-form'

export type InputType = 'text' | 'password' | 'number' | 'phone' | 'date';

interface Props {
  label?: string;
  type?: InputType;
  // value: string | null | number;
  placeholder?: string;
  name: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  register: UseFormRegister<{
    [x: string]: any;
  }>;

}

export default function UiInput({
  name,
  error,
  register,
  label,
  placeholder,
  type = 'text'
}: Props) {

  
  return (
    <div className= {`${styles.input__container} ${error && styles.error}`} >
      <label htmlFor="input">{label}</label>
      <input type="text" id="input" placeholder={placeholder} className={ styles.input  } {...register(`${name}`)}  name={name}/>
      {  <span className={styles.error__span}>{error && `${error}`}</span>}
    </div>
  )
}