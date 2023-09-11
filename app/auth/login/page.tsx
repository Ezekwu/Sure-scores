'use client'
import Image from "next/image"
import dynamic from "next/dynamic"
import Link from "next/link"

const UiButton = dynamic(() => import('../../../components/ui/Button/UiButton'))
const UiForm = dynamic(() => import('../../../components/ui/Form/UiForm'))
const UiInput = dynamic(() => import('../../../components/ui/Input/UiInput'))
const AuthLayout = dynamic(() => import('@/components/layout/AuthLayout/AuthLayout'))

import loginSchema from '../../../utils/validations/loginSchema'
import styles from '../../../styles/FormStyle.module.scss'
import arrowRight from '../../../public/assets/icons/arrowRight.svg'

export default function page() {

  const onSubmit = () => {

  }

  return (
    <AuthLayout>
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
            type="text"
            />
            <UiInput  
            register={register} 
            error={errors?.password?.message}
            name='password'
            label="Password"
            placeholder="enter your password"
            type="password"
            />
            <UiButton>
              Sign In
              <Image  src={arrowRight} alt="arrow right"/>
            </UiButton>
            <Link className={styles.signin_up} href='./signup'>
              Dont have an account? sign up
            </Link>
          </div>
        )}
      </UiForm> 
    </div>
    </AuthLayout>
    
  )
}