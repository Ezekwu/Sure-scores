"use client"

import { useState } from "react"
import BigCalendar from "@/components/layout/Calendar/BigCalendar"
import UiButton from "@/components/ui/Button/UiButton"
import UiTimeInput from "@/components/ui/TimeInput/UiTimeInput"
import UiModal from "@/components/ui/Modal/UiModal"
import UiInput from "@/components/ui/Input/UiInput"
import UiForm from "@/components/ui/Form/UiForm"
import eventSchema from '../../../utils/validations/eventSchema'
import './calendar.css'
import PlusSvg from "@/public/assets/icons/PlusSvg"
import styles from './calendar.module.scss'
export default function page() {
  const [modalVisibility, setModalVisibility] = useState(false);

  function openModal () {
    return setModalVisibility(true)
  }

  function clodeModal () {
    return setModalVisibility(false)
  }

  function onSubmit (data: any) {
    console.log(data);
  }

  return (
    <div className={styles.main}>
      <UiModal isOpen={modalVisibility} closeModal={clodeModal} title="Add Event" >
         <div>
            <UiForm onSubmit={onSubmit} schema={eventSchema}>
              {({errors, register, control})=>(
                <div>
                  <UiTimeInput control={control} name="time"/>
                  <UiButton>
                    submit
                </UiButton>
                </div>
              
              )}
                
            </UiForm>
         </div>
      </UiModal>
      <header>
        <h2>Calendar</h2>
        <UiButton onClick={openModal}>
          <PlusSvg />
          Add Event
        </UiButton>
        {/* <UiTimeInput  /> */}
      </header>
      <BigCalendar />
    </div>
  )
}