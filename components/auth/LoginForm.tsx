'use client'
import UiForm from "../ui/Form/UiForm"
import UiButton from "../ui/Button/UiButton"
import UiInput from "../ui/Input/UiInput"
import loginSchema from '../../utils/validations/loginSchema'
import Image from "next/image"
import styles from './FormStyle.module.scss'
import arrowRight from '../../public/assets/icons/arrowRight.svg'

export default function LoginForm() { 
  const onSubmit = () => {

  }
  return (
    <div>
      <h2 style={{
        textAlign: 'center',
        fontSize: '1.3rem',
        marginBottom: '2rem',
      }}>Sign In to Woorkroom</h2>
      <UiForm onSubmit={onSubmit} schema={loginSchema}>
        {({errors, register})=>(
          <div className={styles.form__wrapper}>
            <UiInput  
            register={register} 
            error={errors?.email?.message}
            name='email'
            label="Email Adress"
            placeholder="enter your email"
            />
            <UiInput  
            register={register} 
            error={errors?.password?.message}
            name='password'
            label="Password"
              placeholder="enter your password"
            />
            <UiButton>
              Sign In
              <Image  src={arrowRight} alt="arrow right"/>
            </UiButton>
            <div className={styles.signin_up}>
              Dont have an account?
            </div>
          </div>
        )}
      </UiForm> 
    </div>
  )
}