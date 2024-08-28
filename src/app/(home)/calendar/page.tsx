"use client"

import { useEffect, useState } from "react"
import BigCalendar from "@/src/components/layout/Calendar/BigCalendar"
import UiButton from '@/src/components/ui/Button/UiButton';
import AddEvent from '@/src/components/Event/AddEvent/AddEvent';
import './calendar.css'
import PlusSvg from "@/public/assets/icons/PlusSvg"
import styles from './calendar.module.scss'
import useToggle from '@/src/utils/hooks/useToggle';
import EventResponse from '@/src/types/EventResponse';
import { useGetEventsQuery } from "@/src/redux/features/Events";
import { getCookie } from "cookies-next";

export default function Page() {
  const companyId = getCookie('active_companyId');
  const [selectedCellDate, setSelectedCellDate] = useState<Date>();
  const [activeEvent, setActiveEvent] = useState<EventResponse>();
  const [compId, setCompId] = useState(companyId);
  const { data: events, isLoading } = useGetEventsQuery(compId!, {
    skip: !compId,
  });  
  const addEventVisible = useToggle();

  function handleActiveEvent(event: EventResponse) {
    setActiveEvent(event);
  }

  function clearActiveEvent() {
    setActiveEvent(undefined)
  }

  // useEffect(() => {
  //   const newCompanyId = getCookie('active_companyId');
  //   if (newCompanyId !== companyId) {
  //     setCompId(newCompanyId);
  //   }
  // }, [compId, companyId]);

  if(isLoading){
    return 'loading...'
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
        events={events}
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