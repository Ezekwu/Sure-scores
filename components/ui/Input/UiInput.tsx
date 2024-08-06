"use client" ;

import { useId } from 'react';
import styles from  './input.module.scss'
import {
  useFormContext,
  FieldError,
  Merge,
  FieldErrorsImpl,
  FieldValues,
  Control,
  Controller,
  UseFormRegister,
} from 'react-hook-form';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import './phoneinput.css';


export type InputType = 'text' | 'password' | 'number' | 'phone' | 'date';

interface Props {
  label?: string;
  type?: InputType;
  placeholder?: string;
  name: string;
  control?: Control<FieldValues>;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
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
  control,
  type = 'text'
}: Props) {

  const [inputType, setInputType] = useState(type);
  const inputId = useId();
  
  const togglePasswordVisibility = () => {
    if (inputType === 'password') setInputType('text');
    else setInputType('password');
  }
 
  return (
    <div className={`${styles.input__container} ${error && styles.error}`}>
      <label htmlFor={inputId}>{label}</label>
      {type === 'phone' ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <PhoneInput
              defaultCountry="ng"
              value={field.value}
              className={error && 'error-style'}
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
      ) : (
        <div className={styles.input__container}>
          <input
            type={inputType}
            id={inputId}
            placeholder={placeholder}
            className={styles.input}
            {...register(`${name}`)}
            name={name}
          />
          {type === 'password' && (
            <div onClick={togglePasswordVisibility} className={styles.icon}>
              {inputType === 'password' ? <FaEyeSlash /> : <FaEye />}
            </div>
          )}
        </div>
      )}
      {<span className={styles.error__span}>{error && `${error}`}</span>}
    </div>
  );
}