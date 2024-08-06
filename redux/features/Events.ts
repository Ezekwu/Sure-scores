import api from '@/api';
import CustomEventType from '@/types/CustomEvent';
import EventResponse from '@/types/EventResponse';
import { fakeBaseQuery, createApi } from '@reduxjs/toolkit/query/react';


export const eventSlice = createApi({
  baseQuery: fakeBaseQuery(),
  reducerPath: 'eventApi',
  tagTypes: ['Event'],
  endpoints: (builder) => ({
    getEvents: builder.query<EventResponse[], void>({
      queryFn: async () => {
        try {
          const events = await api.getEvents();
          console.log(events);
          
          return {data: events}
        } catch (error) {
          return { error: {data: error as Error}};
        }
      },
      providesTags: ['Event']
    }),

    addEvent: builder.mutation({
      queryFn: async (event: CustomEventType) => {        
        try {
           await api.addEvent(event)
        } catch (error) {
          return {error: error}
        }
        return {data: null};
      },
      invalidatesTags: ['Event'],
    }),

    editEvent: builder.mutation({
      queryFn: async (event: CustomEventType) => {
        try {
          const updatedEvent = await api.updateEvent(event);
          return {data: updatedEvent}
        } catch (error) {
          return {error: error}
        }
      },
      invalidatesTags: ['Event'],
    }),
    deleteEvent: builder.mutation({
      queryFn: async (eventId: string) => {
        try {
          await api.deleteEvent(eventId)
          return {data: null}
        } catch (error) {
            return {error: error}
        }
      },
      invalidatesTags: ['Event'],
    })
  })
});


export const {useAddEventMutation, useGetEventsQuery, useEditEventMutation, useDeleteEventMutation } = eventSlice;