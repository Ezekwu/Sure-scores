"use client" ;

import './input.scss'
import { useFormContext, FieldError, Merge, FieldErrorsImpl } from 'react-hook-form'

export type InputType = 'text' | 'password' | 'number' | 'phone' | 'date';

interface Props {
  label?: string;
  type?: InputType;
  // value: string | null | number;
  placeholder?: string;
  name: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined

}

export default function UiInput({
  name,
  // value,
  error,
  label,
  placeholder,
  type
}: Props) {

  const { register } = useFormContext()

  return (
    <div className={`input_container ${error}`} >
      <label htmlFor="input">username</label>
      <input type="text" id="input" placeholder="Enter username" className='input'  {...register(`${name}`)} name={name}/>
      { error && <span>{`${error}`}</span>}
    </div>
  )
}