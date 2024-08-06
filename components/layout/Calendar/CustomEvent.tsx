'use client';

import { EventProps } from 'react-big-calendar';
import styles from './customEvent.module.scss';
import { formatTimeDifference, getPriorityArrow } from '@/utils/helperFunctions';
import UiIcon from '@/components/ui/Icon/UiIcon';
import EventResponse from '@/types/EventResponse';
import { useMemo } from 'react';

export interface CustomEventProps extends EventProps<EventResponse> {
  event: EventResponse;
  setActiveEvent: (event: EventResponse) => void;
  showEventDetails: () => void;
  closeEventList?: () => void;
}

export default function CustomEvent({
  event,
  setActiveEvent,
  showEventDetails,
  closeEventList,
}: CustomEventProps) {
  
  const timeDifference = useMemo(() => {
    return formatTimeDifference(event.start_time, event.end_time);
  }, [event.start_time, event.end_time]);

  function handleClick() {
    setActiveEvent(event);
    showEventDetails();
    closeEventList && closeEventList()
  }

  return (
    <div
      onClick={(e) => {
        handleClick();
        e.stopPropagation();
      }}
      className={styles.customEvent}
    >
      <div className={`${styles.category} ${styles[event.category]}`} />
      <div className={styles.details}>
        <p className={styles.title}>{event.title}</p>
        <div className={`${styles.time_priority} ${styles[event.priority]}`}>
          <p className={styles.time}>{timeDifference}</p>
          <UiIcon icon={getPriorityArrow(event.priority)} size="24" />
        </div>
      </div>
    </div>
  );
}
