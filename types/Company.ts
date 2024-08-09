import CustomEventType from "./CustomEvent";
import User from "./User";

export default interface Company {
  id: string;
  name: string;
  sector: string;
  events?: CustomEventType[];
  members?: User[];
}