"use client";
import styles from './page.module.scss'
import UiButton from '@/components/ui/Button/UiButton'
import UiInput from '@/components/ui/Input/UiInput'
import UiForm from '@/components/ui/Form/UiForm'
import * as yup from 'yup'



export default function Home() {
  const inputErr = 'error'
  const onSubmit = () => {
    console.log('hello world');
  }
  const schema = yup.object().shape({
    fullname: yup.string().required("add your name werey"),
    userName: yup.string().required("add your username werey"),
  });
  
  return (
    <main className={styles.main}>
      Whereas recognition of the inherent dignity
      <br />
      <br />
      <UiForm onSubmit={onSubmit} schema={schema}>
        {({errors, register})=>(
          <div>
            <UiInput  
            error={errors?.fullname?.message} 
            register={register} name='fullname'/>
          
            <UiButton >
              submit
            </UiButton>
          </div>
        )}
      </UiForm>
    </main>
  )
}
