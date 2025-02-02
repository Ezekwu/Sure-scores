import { getPriorityArrow } from "@/utils/helperFunctions";
import UiIcon from "../Icon/UiIcon";
import { Priority } from "@/types/enums/Priority";
import styles from './priority.module.scss'

interface Props {
  priority: Priority
}

export default function UiPriority({priority}: Props) {
  return (
    <div className={`${styles.priority} ${styles[priority]}`}>
      <UiIcon icon={getPriorityArrow(priority)} size="24" />
      <p className={styles.priority_text}>{priority}</p>
    </div>
  );
}
