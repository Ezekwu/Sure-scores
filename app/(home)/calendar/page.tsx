"use client"

import { useState } from "react"
import BigCalendar from "@/components/layout/Calendar/BigCalendar"
import UiButton from "@/components/ui/Button/UiButton"
import AddEvent from "@/components/Event/AddEvent/AddEvent"
import './calendar.css'
import PlusSvg from "@/public/assets/icons/PlusSvg"
import styles from './calendar.module.scss'
import useToggle from "@/utils/hooks/useToggle"
import EventResponse from "@/types/EventResponse"

export default function Page() {
  const [selectedCellDate, setSelectedCellDate] = useState<Date>();
  const [activeEvent, setActiveEvent] = useState<EventResponse>();
  const addEventVisible = useToggle();

  function handleActiveEvent(event: EventResponse) {
    setActiveEvent(event);
  }

  function clearActiveEvent() {
    setActiveEvent(undefined)
  }

  return (
    <div className={styles.main}>
      <header>
        <h2>Calendar</h2>
        <UiButton onClick={() => addEventVisible.on()}>
          <PlusSvg />
          Add Event
        </UiButton>
      </header>
      <BigCalendar
        activeEvent={activeEvent}
        handleActiveEvent={(event) => handleActiveEvent(event)}
        clearActiveEvent={clearActiveEvent}
        getActiveEvent={(event) => handleActiveEvent(event)}
        openAddEventModal={() => addEventVisible.on()}
        getClickedCellValue={(value) => setSelectedCellDate(value)}
      />
      <AddEvent
        isOpen={addEventVisible.value}
        onClose={() => {
          addEventVisible.off();
          setSelectedCellDate(undefined);
          clearActiveEvent();
        }}
        closeEventDetailsModal={() => {}}
        date={selectedCellDate}
        defaultEvent={activeEvent}
      />
    </div>
  );
}