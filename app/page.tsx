"use client";

import styles from './page.module.scss'
import UiButton from '@/components/ui/Button/UiButton'
import UiInput from '@/components/ui/Input/UiInput'
import UiForm from '@/components/ui/Form/UiForm'

import * as yup from 'yup'
import { useForm } from 'react-hook-form';




export default function Home() {

  const onSubmit = (data: any) => {
    console.log('data submitted in parent', data);
  }

  const schema = yup.object().shape({
    fullname: yup.string().required("add your name werey"),
    occupation: yup.string().required('please what is your occupation')
  });
  
  return (
    <main className={styles.main}>
      Whereas recognition of the inherent dignity
      <br />
      <br />
      <UiForm onSubmit={onSubmit} schema={schema}>
        {({errors, register})=>(
          <>
            <UiInput  
            error={errors?.fullname?.message} 
            register={register} name='fullname'/>
            <UiInput  
            error={errors?.occupation?.message} 
            register={register} name='occupation'/>
            <UiButton>
              submit
            </UiButton>
          </>
        )}
      </UiForm>
    </main>
  )
}
