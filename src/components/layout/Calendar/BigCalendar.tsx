"use client"

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import CustomToolbar from './CustomToolbar';
import { useCallback, useState } from 'react';
import CustomDateCell from './CustomDateCell'
import EventsList from '../../Event/EventList/EventsList';
import EventDetails from '../../Event/EventDetails';
import useToggle from '@/src/utils/hooks/useToggle';
import { useGetEventsQuery } from '@/src/redux/features/Events';
import EventResponse from '@/src/types/EventResponse';
import { getCookie } from 'cookies-next';

interface Props {
  events: EventResponse[] | undefined;
  activeEvent: EventResponse | undefined;
  handleActiveEvent: (event: EventResponse) => void;
  openAddEventModal: () => void;
  getClickedCellValue: (value: Date) => void;
  getActiveEvent: (event: EventResponse) => void;
  clearActiveEvent: () => void;
}

export default function BigCalendar({events, openAddEventModal, getClickedCellValue, getActiveEvent, clearActiveEvent, activeEvent, handleActiveEvent }: Props) {
  const companyId = getCookie('active_companyId');
  const [compId, setCompId] = useState(companyId);
  // const { data: events, isLoading } = useGetEventsQuery(compId!, {
  //   skip: !compId,
  // });  
  const [date, setDate] = useState(new Date());
  const [selectedEvents, setSelectedEvents] = useState<EventResponse[]>([]);
  const onNavigate = useCallback(
    (newDate: Date) => setDate(newDate),
    [setDate],
  );
  const localizer = momentLocalizer(moment);
  const isEventsListVisible = useToggle();
  const isEventsDetailsVisible = useToggle();

  function showEventDetails() {
    isEventsDetailsVisible.on();
  }
  

  return (
    <div>
      <Calendar
        localizer={localizer}
        date={date}
        onNavigate={onNavigate}
        startAccessor="start"
        endAccessor="end"
        events={events}
        components={{
          toolbar: CustomToolbar,
          dateCellWrapper: (props) => (
            <CustomDateCell
              events={events!}
              setActiveEvent={(event) => {
                handleActiveEvent(event);
                getActiveEvent(event);
              }}
              {...props}
              onClick={(value: Date) => {
                openAddEventModal();
                getClickedCellValue(value);
              }}
              onMoreEventsClick={(events) => {
                isEventsListVisible.on();
                setSelectedEvents(events);
              }}
              showEventDetails={showEventDetails}
            />
          ),
        }}
      />
      <EventsList
        isOpen={isEventsListVisible.value}
        onClose={() => {
          isEventsListVisible.off();
        }}
        events={selectedEvents}
        setActiveEvent={(event) => {
          handleActiveEvent(event);
          getActiveEvent(event);
        }}
        showEventDetails={showEventDetails}
      />
      <EventDetails
        openAddEventModal={() => openAddEventModal()}
        isOpen={isEventsDetailsVisible.value}
        onClose={() => {
          isEventsDetailsVisible.off();
        }}
        clearActiveEvent={() => clearActiveEvent()}
        event={activeEvent!}
      />
    </div>
  );
}
   