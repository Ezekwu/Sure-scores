import EventResponse from '@/types/EventResponse';
import {
  formatTimeDifference,
  getPriorityArrow,
} from '@/utils/helperFunctions';
import styles from './eventDetails.module.scss';
import { useDeleteEventMutation } from '@/redux/features/Events';
import UiIcon, { Icons } from '@/components/ui/Icon/UiIcon';
import { formatTo12Hour } from '@/utils/helperFunctions';
import { Toast } from '@/utils/toast';
import { EventCategory } from '@/types/enums/EventCategory';
import UiButton from '@/components/ui/Button/UiButton';
import { useMemo } from 'react';
import moment from 'moment';

interface Props {
  event: EventResponse;
  fullDetails?: boolean;
  showCategoryIcon?: boolean;
  truncateTitle?: boolean;
  onClose?: () => void;
  onClick?: () => void;
  openEditEventModal?: () => void;
  clearActiveEvent?: () => void
}

export default function EventDetailsCard({
  event,
  fullDetails,
  showCategoryIcon,
  truncateTitle,
  onClick,
  onClose,
  openEditEventModal,
  clearActiveEvent,
}: Props) {
  const [deleteDoc, { isLoading }] = useDeleteEventMutation();

  const timeDifference = useMemo(() => {
    return formatTimeDifference(event.start_time, event.end_time);
  }, [event.start_time, event.end_time]);


  function onEditClick() {
    openEditEventModal!();
    onClose!();
}

  function removeDoc() {
    deleteDoc(event.id).then(() => {
      onClose!();
      clearActiveEvent!()
      Toast.success({ msg: 'Document succesfullt deleted' });
    });
  }

  console.log(typeof event.date);
  

  function getCategoryIcon(category: EventCategory): Icons {
    if (category === EventCategory.cooperate_event) {
      return 'Corperate';
    } else if (category === EventCategory.birthday) {
      return 'Birthday';
    } else if (category === EventCategory.leisure) {
      return 'Movie';
    } else if (category === EventCategory.team_event) {
      return 'Meeting';
    }
    return 'Corperate';
  }

  const getDate = (timestamp: string | Date) => {
    const now = moment();
    const date = moment(timestamp);

    if (date.isSame(now, 'day')) {
      return 'Today';
    } else if (date.isSame(now.clone().subtract(1, 'days'), 'day')) {
      return 'Yesterday';
    } else if (date.isSame(now.clone().add(1, 'days'), 'day')) {
      return 'Tomorrow';
    } else {
      return date.format('MMM DD');
    }
  };
  return (
    <article onClick={onClick} className={styles.eventDetails}>
      <div className={styles.eventDetails_wrapper}>
        <div className={styles.col_1}>
          <div className={styles.category_details}>
            <div className={`${styles.category} ${styles[event?.category]}`} />
            <section className={styles.details}>
              <div className={`${styles.title_date} `}>
                <div className={`${styles.category_title}`}>
                  {showCategoryIcon && (
                    <div className={styles.categoryIcon}>
                      <UiIcon
                        icon={getCategoryIcon(event.category)}
                        size="24"
                      />
                    </div>
                  )}
                  <h3
                    className={`${styles.title} ${truncateTitle && styles.titleTruncated}`}
                  >
                    {event?.title}
                  </h3>
                </div>
                <span className={styles.date}>
                  {getDate(event.date.toDate().toDateString())} |{' '}
                  {formatTo12Hour(event.start_time)}{' '}
                  {fullDetails && `- ${formatTo12Hour(event.end_time)}`}
                </span>
              </div>
            </section>
          </div>
        </div>
        <div
          className={`${styles.col_2} ${!fullDetails && styles.dashboard_gap}`}
        >
          <div className={`${styles[event.priority]} ${styles.priority}`}>
            {fullDetails && <h4>Priority</h4>}
            <div
              className={`${styles.priority_arrow} ${styles[event.priority]}`}
            >
              <UiIcon icon={getPriorityArrow(event?.priority)} size="24" />
              {fullDetails && (
                <p className={styles.priority}>{event.priority}</p>
              )}
            </div>
          </div>
          <div className={styles.time}>
            <UiIcon icon="ClockFilled" size="24" />
            <p>{timeDifference}</p>
          </div>
        </div>
      </div>
      {fullDetails && event.description !== '' && (
        <div className={styles.description}>
          {}
          <h4>Description</h4>
          <p>{event?.description}</p>
        </div>
      )}
      {fullDetails && (
        <div className={styles.edit_delete}>
          <UiButton
            type="button"
            variant="secondary"
            onClick={onEditClick}
            size="icon"
          >
            <UiIcon icon="Edit" size="24" />
          </UiButton>
          <UiButton
            type="button"
            variant="danger-secondary"
            size="icon"
            onClick={removeDoc}
          >
            <UiIcon icon="Delete" size="24" />
          </UiButton>
        </div>
      )}
    </article>
  );
}
