"use client" ;

import { useId } from 'react';
import styles from  './input.module.scss'
import { useFormContext, FieldError, Merge, FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { use, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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

  const [inputType, setInputType] = useState(type);
  const inputId = useId();
  const togglePasswordVisibility = () => {
    if (inputType === 'password') setInputType('text');
    else setInputType('password');
  }
 

  return (
    <div className= {`${styles.input__container} ${error && styles.error}`} >  
      <label htmlFor={inputId}>{label}</label>
      <div className={styles.input__container}>
        <input type={inputType} id={inputId} placeholder={placeholder} className={styles.input} {...register(`${name}`)}  name={name}/>
        {
          type === 'password' && (
            <div onClick={togglePasswordVisibility} className={styles.icon}>
              { inputType === 'password' ? <FaEyeSlash /> : <FaEye />}
            </div> 
          )
        }
      </div>
      {<span className={styles.error__span}>{error && `${error}`}</span>}
    </div>
  )
}