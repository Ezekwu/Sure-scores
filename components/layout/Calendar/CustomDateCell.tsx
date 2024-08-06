'use client';
import { useMemo } from 'react';
import { DateCellWrapperProps, momentLocalizer, } from 'react-big-calendar';
import styles from './customDateCell.module.scss';
import CustomEventType from '@/types/CustomEvent';
import CustomEvent from './CustomEvent';
import moment from 'moment';
import EventResponse from '@/types/EventResponse';

interface CustomProps extends DateCellWrapperProps {
  children: React.JSX.Element;
  events: EventResponse[];
  showEventDetails: () => void;
  onMoreEventsClick: (events: EventResponse[]) => void;
  setActiveEvent: (event: EventResponse) => void;
  onClick: (value: Date) => void;
}

export default function CustomDateCell({ onClick, onMoreEventsClick, setActiveEvent, showEventDetails, children, value, events, ...props }: CustomProps) {
  const localizer = momentLocalizer(moment);
  const dayOfWeek = value.getDay();          
                                                                                          
  const isStartOfWeek = dayOfWeek === 0; 
  const dateEvents = useMemo(() => {
    return events.filter((event) => {
      const eventDate = event.date.toDate();
      return eventDate.toDateString() === value.toDateString();
    });
  }, [events, value]);
  
  const customStyle = {
    borderLeft: isStartOfWeek ? 'none' : '1px solid #E6EBF5',
  };

  return (
    <div
      {...props}
      style={customStyle}
      className={styles.customDateCell}
      onClick={() => onClick(value)}
    >
      { dateEvents.slice(0, 3).map((event, index) => (
        <div
          style={{
            zIndex: index + 1,
          }}
          className={` ${styles.event} ${index > 0 && styles.overlap_event}`}
          key={index}
        >
          <CustomEvent
            key={event.id}
            event={event}
            continuesAfter={false}
            continuesPrior={false}
            localizer={localizer}
            slotEnd={new Date()}
            slotStart={new Date()}
            showEventDetails={showEventDetails}
            title=""
            isAllDay={false}
            setActiveEvent={setActiveEvent}
          />
        </div>
        ))}{' '}
      {dateEvents.length > 3 && (
        <button
          onClick={(e) => {
            onMoreEventsClick(dateEvents);
            e.stopPropagation();
          }}
          className={styles.extraEvents}
        >
          +{dateEvents.length - 3}
        </button>
      )}
      <div className={styles.children}>{children}</div>
    </div>
  );
}
