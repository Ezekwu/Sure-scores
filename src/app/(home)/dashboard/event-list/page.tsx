'use client';
import Link from 'next/link';
import EventDetailsCard from '@/src/components/Event/EventDetailsCard/EventDetailsCard';
import AddEvent from '@/src/components/Event/AddEvent/AddEvent';
import UiButton from '@/src/components/ui/Button/UiButton';
import { useGetEventsQuery } from '@/src/redux/features/Events';
import styles from './page.module.scss'
import UiIcon from '@/src/components/ui/Icon/UiIcon';
import useToggle from '@/src/utils/hooks/useToggle';
import EventResponse from '@/src/types/EventResponse';
import { useState } from 'react';
import EventDetails from '@/src/components/Event/EventDetails';
import { getCookie } from 'cookies-next';

export default function Page() {
  const companyId = getCookie('active_companyId');
  const [activeEvent, setActiveEvent] = useState<EventResponse | null>(null);
  const { data: events, isLoading } = useGetEventsQuery(companyId);
  const isEditEventVisible = useToggle();
  const isEventDetailsVisible = useToggle();

  function openEventDetails() {
    isEventDetailsVisible.on()
  }

  function closeEventDetails() {
    isEventDetailsVisible.off()
  }

  function openEditEvent() {
    isEditEventVisible.on();
  }

  function closeEditEvent () {
    isEditEventVisible.off()
    setActiveEvent(null);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <Link href="/dashboard">
          <UiIcon icon="ArrowLeft" size="24" />
          <p>Back to Dashboard</p>
        </Link>
        <div className={styles.title_addEvent}>
          <h2>Nearest Events</h2>
          <UiButton onClick={openEditEvent}>
            <UiIcon icon="Plus" size="24" />
            <p>Add Event</p>
          </UiButton>
        </div>
      </header>
      <section className={styles.eventsList}>
        {events?.map((event) => (
          <div
            onClick={() => {
              openEventDetails();
              setActiveEvent(event);
              
            }}
            key={event.id}
            className={styles.eventDetails_wrapper}
          >
            <EventDetailsCard event={event} truncateTitle showCategoryIcon />
          </div>
        ))}
      </section>
      <EventDetails
        event={activeEvent!}
        isOpen={isEventDetailsVisible.value}
        onClose={closeEventDetails}
        clearActiveEvent={() => setActiveEvent(null)}
        openAddEventModal={openEditEvent}
      />
      <AddEvent
        closeEventDetailsModal={() => isEventDetailsVisible.off()}
        isOpen={isEditEventVisible.value}
        onClose={closeEditEvent}
        defaultEvent={activeEvent!}
      />
    </div>
  );
}
