import UiModal from '@/components/ui/Modal/UiModal';
import EventDetailsCard from "./EventDetailsCard/EventDetailsCard";
import { formatDate } from '@/utils/helperFunctions';
import EventResponse from '@/types/EventResponse';

interface Props {
  event: EventResponse;
  isOpen: boolean;
  onClose: () => void;
  openAddEventModal: () => void;
  clearActiveEvent: () => void;
}

export default function EventDetails({ event, isOpen, onClose, openAddEventModal, clearActiveEvent }: Props) {
  const date = event?.date?.toDate();

  return (
    <UiModal
      closeModal={() => {
        onClose();
        clearActiveEvent();
      }}
      isOpen={isOpen}
      title={formatDate(`${date}`, 'MMM D, YYYY')}
    >
      <EventDetailsCard
        openEditEventModal={openAddEventModal}
        clearActiveEvent={clearActiveEvent}
        fullDetails
        showCategoryIcon
        onClose={onClose}
        event={event}
      />
    </UiModal>
  );
}
