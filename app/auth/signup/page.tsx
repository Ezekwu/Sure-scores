'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

const UiButton = dynamic(() => import('../../../components/ui/Button/UiButton'))
const UiForm = dynamic(() => import('../../../components/ui/Form/UiForm'))
const UiInput = dynamic(() => import('../../../components/ui/Input/UiInput'))
const AuthLayout = dynamic(() => import('@/components/layout/AuthLayout/AuthLayout'))
import styles from '../../../styles/FormStyle.module.scss'
import arrowRight from '../../../public/assets/icons/arrowRight.svg'
import loginSchema from '@/utils/validations/loginSchema'




export default function page() {
  const onSubmit = () => {

  }

  return (
    <AuthLayout>
      <h2 style={{
          textAlign: 'center',
          fontSize: '1.3rem',
          marginBottom: '2rem',
        }}>
          Register to Woorkroom
      </h2>
      <UiForm onSubmit={onSubmit} schema={loginSchema}>
        {({errors, register})=>(
          <div className={styles.form__wrapper}>
            <UiInput  
            register={register} 
            error={errors?.email?.message}
            name='email'
            label="Email Address"
            placeholder="enter your email"
            />
            <UiInput  
            register={register} 
            error={errors?.password?.message}
            name='password'
            label="Create Password"
            placeholder="enter your password"
            type='password'
            />
            <UiInput  
            register={register} 
            error={errors?.password?.message}
            name='confirm-password'
            label="Confirm Password"
            placeholder="confirm your password"
            type='password'
            />
            <UiButton>
              Sign Up
              <Image  src={arrowRight} alt="arrow right"/>
            </UiButton>
            <Link className={styles.signin_up} href='./login'>
              Alredy have an account? sign in.
            </Link>
          </div>
        )}
      </UiForm> 
    </AuthLayout>
  )
}