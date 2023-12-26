"use client"
import { useState } from 'react';
import TimePicker from 'react-time-picker';
import './Timeinput.css'
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { Controller, FieldValues, Control } from 'react-hook-form';
import ClockSvg from '@/public/assets/icons/ClockSvg';

interface Props {
  control: Control<FieldValues>
  name: string
}

export default function UiTimeInput({ control, name }: Props) {
  
  return (
    <div>
      <Controller name={name} control={control} render={({field}) => (
        <TimePicker onChange={field.onChange} value={field.value} clearIcon={null}  hourPlaceholder=''  minutePlaceholder='' clockIcon={<ClockSvg />}  isOpen={false}/>
      )}/>
    </div>
  );
}