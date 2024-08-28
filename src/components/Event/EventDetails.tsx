import UiModal from '@/src/components/ui/Modal/UiModal';
import EventDetailsCard from "./EventDetailsCard/EventDetailsCard";
import { formatDate, getPriorityArrow } from '@/src/utils/helperFunctions';
import EventResponse from '@/src/types/EventResponse';
import { useDeleteEventMutation } from '@/src/redux/features/Events';
import UiIcon from "../ui/Icon/UiIcon";

interface Props {
  event: EventResponse;
  isOpen: boolean;
  onClose: () => void;
  openAddEventModal: () => void;
  clearActiveEvent: () => void;
}

export default function EventDetails({ event, isOpen, onClose, openAddEventModal, clearActiveEvent }: Props) {
  const [deleteDoc, {isLoading}] = useDeleteEventMutation();
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