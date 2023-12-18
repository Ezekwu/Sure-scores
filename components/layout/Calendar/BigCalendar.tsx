"use client"

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import CustomToolbar from './CustomToolbar.tsx'

export default function BigCalendar () {
  const localizer = momentLocalizer(moment)
  
  return (
    <Calendar localizer={localizer} view='month'  views={['month']} 
    components={{
      toolbar: CustomToolbar
    }}/>
  )
}