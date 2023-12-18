import BigCalendar from "@/components/layout/Calendar/BigCalendar"
import UiButton from "@/components/ui/Button/UiButton"
import './calendar.css'
import PlusSvg from "@/public/assets/icons/PlusSvg"
import styles from './calendar.module.scss'
export default function page() {
  return (
    <div style={{

    }} className={styles.main}>
      <header>
        <h2>Calendar</h2>
        <UiButton>
          <PlusSvg />
          Add Event
        </UiButton>
      </header>
      <BigCalendar />
    </div>
  )
}