import BigCalendar from "@/components/layout/Calendar/BigCalendar"
import UiButton from "@/components/ui/Button/UiButton"
import UiTimeInput from "@/components/ui/TimeInput/UiTimeInput"
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
        {/* <UiTimeInput  /> */}
      </header>
      <BigCalendar />
    </div>
  )
}