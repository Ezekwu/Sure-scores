"use client";
import Image from 'next/image'
import styles from './page.module.scss'
import UiButton from '@/components/ui/Button/UiButton'
import UiInput from '@/components/ui/Input/UiInput'
import UiForm from '@/components/ui/Form/UiForm'
import * as yup from 'yup'
import { SubmitHandler } from 'react-hook-form'


export default function Home() {
  const inputErr = 'error'
  const onSubmit = (data: SubmitHandler<any>) => {
     console.log(data);
     
  }
  const schema = yup.object().shape({
    fullname: yup.string().required()
  });

  return (
    <main className={styles.main}>
      Whereas recognition of the inherent dignity
      <br />
      <br />
      
      <UiForm onSubmit={onSubmit} schema={schema}>
        {(errors)=>(
          <div>
            <UiInput  name='fullname' error={errors?.fullname?.message}/>
            <UiButton>
              sign in
            </UiButton>
          </div>
        )}
      </UiForm>
    </main>
  )
}
