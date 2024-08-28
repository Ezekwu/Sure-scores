import React, { useMemo } from 'react';
import UiForm from '../../ui/Form/UiForm';
import UiModal from '../../ui/Modal/UiModal';
import styles from './addEvent.module.scss';
import eventSchema from '@/src/utils/validations/eventSchema';
import UiInput from '@/src/components/ui/Input/UiInput';
import { Controller } from 'react-hook-form';
import UiSelect, { Option } from '@/src/components/ui/Select/UiSelect';
import UidatePicker from '@/src/components/ui/DatePicker/UiDatePicker';
import UiTimeInput from '@/src/components/ui/TimeInput/UiTimeInput';
import UiTextArea from '@/src/components/ui/TextArea/UiTextArea';
import UiButton from '@/src/components/ui/Button/UiButton';
import { Priority } from '@/src/types/enums/Priority';
import {
  useAddEventMutation,
  useEditEventMutation,
} from '@/src/redux/features/Events';
import CustomEventType from '@/src/types/CustomEvent';
import { Toast } from '@/src/utils/toast';
import EventResponse from '@/src/types/EventResponse';
import { Timestamp, serverTimestamp } from 'firebase/firestore';

interface Props {
  isOpen: boolean;
  date?: Date;
  defaultEvent?: EventResponse;
  onClose: () => void;
  closeEventDetailsModal: () => void;
}

export default function AddEvent({ isOpen, date, onClose, closeEventDetailsModal, defaultEvent }: Props) {
  const [addEvent, {isLoading}] = useAddEventMutation();
  const [editEvent, {isLoading: isEditEventLoading}] = useEditEventMutation();
  const eventCategoryOptions: Option[] = [
    {
      label: 'cooperate event',
      value: 'cooperate_event',
    },
    {
      label: 'team event',
      value: 'team_event',
    },
    {
      label: 'birthday',
      value: 'birthday',
    },
    {
      label: 'leisure',
      value: 'leisure',
    },
  ];
  const eventPriorityOptions: Option[] = useMemo(() => {
    return Object.values(Priority).map((priority) => ({
      label: priority,
      value: priority,
    }));
  }, []);
  
  let formatedDefaultEvent = {
    ...defaultEvent,
    date: defaultEvent?.date.toDate(),
  };
  
    
  function onSubmit(event: CustomEventType) {
    if (defaultEvent) {      
      editEvent(event)
      .unwrap()
      .then(()=>{
        onClose();
        closeEventDetailsModal()
        Toast.success({ msg: 'event successfully updated' });
      })
    } else {
      const timeStampedEvent = {
        ...event,
        created_at: serverTimestamp()
      }
      addEvent(timeStampedEvent)
        .unwrap()
        .then(() => {
          onClose();
          Toast.success({ msg: 'event successfully added' });
        });
    }
  }

  return (
    <UiModal
      isOpen={isOpen}
      closeModal={onClose}
      title={`${defaultEvent ? 'Edit' : 'Add'} Event`}
    >
      <div>
        <UiForm
          defaultValues={formatedDefaultEvent}
          onSubmit={onSubmit}
          schema={eventSchema}
        >
          {({ errors, register, control }) => (
            <div className={styles.addEvent_form}>
              <UiInput
                name="title"
                label="Event Name"
                register={register}
                placeholder="Event Name"
                type="text"
                error={errors.title?.message}
              />
              <UiSelect
                label="Event Category"
                name="category"
                error={errors.category?.message}
                options={eventCategoryOptions}
                placeholder="Event Category"
                control={control}
              />
              <UiSelect
                label="Priority"
                name="priority"
                error={errors.priority?.message}
                options={eventPriorityOptions}
                placeholder="Priority"
                control={control}
              />
              <UidatePicker
                error={errors.date?.message}
                control={control}
                name="date"
                label="Select Date"
                date={date}
              />
              <div className={styles.flex}>
                <UiTimeInput
                  control={control}
                  name="start_time"
                  label="Starts"
                  error={errors.start_time?.message}
                />
                <UiTimeInput
                  control={control}
                  name="end_time"
                  label="Ends"
                  error={errors.end_time?.message}
                />
              </div>
              <UiTextArea
                name="description"
                label="Description"
                register={register}
                placeholder="Add some description of the event"
              />
              <UiButton loading={defaultEvent ? isEditEventLoading : isLoading}>
                {defaultEvent ? 'Edit' : 'Save'} Event
              </UiButton>
            </div>
          )}
        </UiForm>
      </div>
    </UiModal>
  );
}
