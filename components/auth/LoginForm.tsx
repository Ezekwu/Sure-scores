'use client'
import UiForm from "../ui/Form/UiForm"
import UiButton from "../ui/Button/UiButton"
import UiInput from "../ui/Input/UiInput"
import loginSchema from '../../utils/validations/loginSchema'
import styles from './FormStyle.module.scss'

export default function LoginForm() { 
  const onSubmit = () => {

  }
  return (
    <div>
      <h2>Sign In to Woorkroom</h2>
      <UiForm onSubmit={onSubmit} schema={loginSchema}>
        {({errors, register})=>(
          <div className={styles.form__wrapper}>
            <UiInput  
            register={register} 
            error={errors?.email?.message}
            name='email'
            label="Email Adress"
            />
            <UiInput  
            register={register} 
            error={errors?.password?.message}
            name='password'
            label="Password"
            />
            <UiButton>
              Sign In
            </UiButton>
          </div>
        )}
      </UiForm>
    </div>
  )
}