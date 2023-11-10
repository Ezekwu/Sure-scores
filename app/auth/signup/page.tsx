'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/navigation'

import UiButton from '../../../components/ui/Button/UiButton'
import UiForm from '../../../components/ui/Form/UiForm'
import UiInput from '../../../components/ui/Input/UiInput'
import AuthLayout from '@/components/layout/AuthLayout/AuthLayout'

import styles from '../../../styles/FormStyle.module.scss';
import arrowRight from '../../../public/assets/icons/arrowRight.svg';
import loginSchema from '@/utils/validations/loginSchema';
import { useRegisterUserMutation } from '@/redux/features/account/accountSlice'
import SignUpUser from '@/types/SignUpUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function page() {
  const [registerUser, {isError, isLoading, isSuccess, error}] = useRegisterUserMutation();
  const router = useRouter();
  

  const onSubmit = (userDetails:SignUpUser) => {
    registerUser(userDetails)
      .unwrap()
      .then(()=>{
        router.push('/home')
      })
      .catch((err: { message: string }) => {
        let msg: string = err.message;

        if (err.message === 'FirebaseError: Firebase: Error (auth/email-already-in-use).') {
          msg = ' A user with this email already exists';
        }
        toast(msg, { type: 'error' })
        console.log(err.message);
      })
  
    
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
              {isLoading ? 'loading...' : 'Sign Up'}
            
              <Image  src={arrowRight} alt="arrow right"/>
            </UiButton>
            <Link className={styles.signin_up} href='./login'>
              Alredy have an account? sign in.
            </Link>
          </div>
        )}
      </UiForm> 
      <ToastContainer />
    </AuthLayout>
  )
}