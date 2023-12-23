"use client"
import { useState } from 'react';
import TimePicker from 'react-time-picker';
import './Timeinput.css'
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import ClockSvg from '@/public/assets/icons/ClockSvg';

export default function UiTimeInput() {
  const [value, onChange] = useState<string | null>('');

  return (
    <div>
      <TimePicker onChange={onChange} value={value} clearIcon={null}  hourPlaceholder=''  minutePlaceholder='' clockIcon={<ClockSvg />}  isOpen={false}/>
    </div>
  );
}