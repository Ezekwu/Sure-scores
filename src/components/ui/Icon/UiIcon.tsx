'use client';

import ArrowDown from './icons/arrow-down.svg';
import ArrowLeft from './icons/arrow-left.svg'
import ArrowRight from './icons/arrow-right.svg';
import ArrowUp from './icons/arrow-up.svg';
import Attach from './icons/attach.svg';
import Bell from './icons/bell.svg';
import Birthday from './icons/birthday.svg';
import Calendar from './icons/calendar.svg';
import CalendarThin from './icons/calendar-thin.svg';
import Company from './icons/companysvg.svg';
import CaretDown from './icons/caret-down.svg';
import CaretRight from './icons/caret-right.svg'
import CaretUp from './icons/caret-up.svg';
import ClockFilled from './icons/clock-filled.svg';
import Corperate from './icons/corperate.svg';
import Delete from './icons/delete.svg';
import Edit from './icons/edit.svg';
import Link from './icons/addlink.svg';
import Logo from './icons/logo.svg';
import Meeting from './icons/meeting.svg';
import Message from './icons/message.svg'
import Movie from './icons/movie.svg';
import Plus from './icons/plus.svg';
import Teammates from './icons/teammates.svg';
import ThreeDots from './icons/three-dots.svg';
import X from './icons/x.svg';

// These icons should be arranged alphabetically for easy sorting
const icons = {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Attach,
  Bell,
  Birthday,
  Calendar,
  CalendarThin,
  Company,
  CaretDown,
  CaretRight,
  CaretUp,
  ClockFilled,
  Corperate,
  Delete,
  Edit,
  Link,
  Logo,
  Meeting,
  Message,
  Movie,
  Plus,
  Teammates,
  ThreeDots,
  X,
};

export type Icons = keyof typeof icons;
interface Props {
  /** Name of the icon as stored in the icons object */
  icon: Icons;
  size?: string;
}
export default function UiIcon({ icon, size = '16' }: Props) {
  const LazyLoadedIcon = icons[icon];
  return (
    <>
      {LazyLoadedIcon && (
        <LazyLoadedIcon style={{ width: size, height: size }} />
      )}
    </>
  );
}
