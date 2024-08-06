import { Icons } from "@/components/ui/Icon/UiIcon";
import { Priority } from "@/types/enums/Priority";
import moment from "moment";

export function formatDate(date: string, format: string) {
  const dateObject = moment(date);
  if (!dateObject.isValid()) {
    return
  }
  return dateObject.format(format);
}


// export function formatTimeDifference(time1: string, time2: string) {
//   const toMinutes = (time: string) => {
//     const [hours, minutes] = time.split(':').map(Number);
    
//     const formatedHours =  hours % 12 || 12;
//     return hours * 60 + minutes;
//   };

//   const minutes1 = toMinutes(time1);
//   const minutes2 = toMinutes(time2);

//   let difference = Math.abs(minutes2 - minutes1);

//   if (difference >= 60) {
//     const hours = Math.floor(difference / 60);
//     return `${hours}h`;
//   } else {
//     return `${difference}m`;
//   }
// }
export function formatTimeDifference(time1: string, time2: string) {
  // Helper function to convert time to total minutes
  const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Convert both times to total minutes
  const minutes1 = toMinutes(time1);
  const minutes2 = toMinutes(time2);

  // Calculate the difference in minutes
  let difference = minutes2 - minutes1;
  if (difference < 0) {
    difference += 1440; // add 24 hours in minutes if the difference is negative
  }

  // Calculate hours and remaining minutes
  const hours = Math.floor(difference / 60);
  const minutes = difference % 60;

  // Format the output based on the difference
  if (minutes < 1) {
    return `${hours}h`;
  } else if (minutes > 55) {
    return `${hours + 1}h`;
  } else {
    return `${hours}h ${minutes}m`;
  }
}



export function formatTo12Hour(time: string) {
  let [hours, minutes] = time.split(':').map(Number);
  const meridiem = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes} ${meridiem}`;
}

export function getPriorityArrow(priority: Priority): Icons {
  if (priority === Priority.high) {
    return 'ArrowUp';
  } else if (priority === Priority.medium) {
    return 'ArrowRight';
  } else if (priority === Priority.low) {
    return 'ArrowDown';
  }
  return 'ArrowUp';
}


