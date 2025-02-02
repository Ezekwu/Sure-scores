"use client"
import { useState } from 'react';
import TimePicker from 'react-time-picker';
import './Timeinput.css'
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { Controller, FieldValues, Control, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import ClockSvg from 'public/assets/icons/ClockSvg';

interface Props {
  control: Control<FieldValues>;
  name: string;
  label: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
}

export default function UiTimeInput({ control, name, label, error }: Props) {
  
  return (
    <div className={`wrapper ${error && 'error'}`}>
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TimePicker
            onChange={field.onChange}
            value={field.value}
            clearIcon={null}
            hourPlaceholder=""
            minutePlaceholder=""
            clockIcon={<ClockSvg />}
            isOpen={false}
          />
        )}
      />
      {<span className="error-message">{error && `${error}`}</span>}
    </div>
  );
}
