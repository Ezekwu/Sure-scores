import { FieldValue, Timestamp } from "firebase/firestore";
import Link from './Link'
import { Priority } from "./enums/Priority";
import Task from "./Task";
import { CloudinaryResponse } from "../utils/hooks/useCloudinaryUpload";

export default interface Project {
  id: string;
  project_number: string;
  name: string;
  avatar: string | undefined;
  start_date: string;
  created_at: FieldValue |Timestamp;
  priority: Priority;
  links: Link[];
  files: CloudinaryResponse[] | undefined;
  description: string;
  tasks: Task[]
}