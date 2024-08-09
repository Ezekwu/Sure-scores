import { Event } from "react-big-calendar";
import { EventCategory } from "./enums/EventCategory";
import { Priority } from "./enums/Priority";
import { FieldValue } from "firebase/firestore";

export default interface CustomEventType extends Event {
  id: string;
  category: EventCategory;
  priority: Priority;
  description?: string;
  date: Date;
  start_time: string;
  end_time: string;
  created_at: FieldValue;
}