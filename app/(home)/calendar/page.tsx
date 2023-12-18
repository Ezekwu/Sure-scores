import BigCalendar from "@/components/layout/Calendar/BigCalendar"
import './calendar.css'
export default function page() {
  return (
    <div style={{
      width:'100%'
    }}>
      <header>
        <h2>Calendar</h2>
        
      </header>
      <BigCalendar />
    </div>
  )
}