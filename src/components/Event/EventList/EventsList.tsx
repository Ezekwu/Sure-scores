import CustomEvent from "../../layout/Calendar/CustomEvent";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import styles from './eventList.module.scss';
import UiModal from '@/components/ui/Modal/UiModal';
import { formatDate } from '@/utils/helperFunctions';
import EventResponse from '@/types/EventResponse';

interface Props {
  isOpen: boolean;
  events: EventResponse[];
  showEventDetails: () => void;
  onClose: () => void;
  setActiveEvent: (event: EventResponse) => void;
}

export default function EventsList({isOpen, events, onClose, setActiveEvent, showEventDetails}: Props) {
  const localizer = momentLocalizer(moment);
  const day = events[0]?.date.toDate()

  
  return (
    <UiModal
      title={formatDate(`${day}`, 'MMM D, YYYY')}
      closeModal={onClose}
      isOpen={isOpen}
    >
      <div className={styles.eventList}>
        {events.map((event) => (
          <CustomEvent
            key={event.id}
            event={event}
            continuesAfter={false}
            continuesPrior={false}
            localizer={localizer}
            slotEnd={new Date()}
            slotStart={new Date()}
            title=""
            isAllDay={false}
            showEventDetails={showEventDetails}
            setActiveEvent={(event) => setActiveEvent(event)}
            closeEventList={() => onClose()}
          />
        ))}
      </div>
    </UiModal>
  );
}
