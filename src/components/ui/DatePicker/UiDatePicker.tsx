import OutsideClickHandler from "react-outside-click-handler";
import Calendar from "react-calendar"
import { Controller, FieldValues, Control, FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';
import 'react-calendar/dist/Calendar.css';
import CalendarThinSvg from "public/assets/icons/CalendarThinSvg";
import useToggle from '@/utils/hooks/useToggle';

import styles from './datepicker.module.scss'
import './datepicker.css'

interface Props {
  control: Control<FieldValues>;
  name: string;
  label: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  date?: Date
}

export default function UidatePicker ({ control, name, label, error, date }: Props) {
  const isCalendarVisible = useToggle();

  function hideCalendar() {
    return isCalendarVisible.off()
  }
  
  console.log(date);

  
  function toggleCalendar() {
    return isCalendarVisible.toggle()
  }  
  
  return (
    <OutsideClickHandler
      onOutsideClick={(e) => {
        hideCalendar();
      }}
    >
      <div
        className={`${styles.date_picker_wrapper}  ${error && styles.error}`}
      >
        <label>{label}</label>
        <Controller
          name={name}
          control={control}
          defaultValue={date}
          render={({ field }) => (
            <div className={styles.input_calendar_wrapper}>
              <div
                onClick={toggleCalendar}
                className={`${styles.date_picker} ${isCalendarVisible.value && styles.picker_visible}`}
              >
                <p>{field.value?.toDateString() || 'Select Date'}</p>
                <CalendarThinSvg />
              </div>
              <div className={styles.calendar_wrapper}>
                {isCalendarVisible.value && (
                  <Calendar onChange={field.onChange} value={field.value} />
                )}
              </div>
            </div>
          )}
        />
        {<span className={styles.error__span}>{error && `${error}`}</span>}
      </div>
    </OutsideClickHandler>
  );
}
