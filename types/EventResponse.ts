import { Timestamp } from "firebase/firestore";
import CustomEventType from "./CustomEvent";

export default interface EventResponse extends Omit<CustomEventType, 'date' | 'created_at'> {
  date: Timestamp;
  created_at: Timestamp
}