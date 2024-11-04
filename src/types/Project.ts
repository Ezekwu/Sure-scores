import { FieldValue, Timestamp } from "firebase/firestore";
import Link from './Link'
import { Priority } from "./enums/Priority";
import Task from "./Task";
import { CloudinaryResponse } from "../utils/hooks/useCloudinaryUpload";
import { FileData } from "../components/ui/FilePreview/UiFilePreview";


export default interface Project {
  id: string;
  project_number: string;
  name: string;
  avatar: string | undefined;
  start_date: string;
  dead_line: string;
  created_at: FieldValue | string;
  priority: Priority;
  links: Link[];
  files: FileData[] | undefined;
  description: string;
  tasks: Task[]
}