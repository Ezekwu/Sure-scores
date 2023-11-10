'use client'
import Image from "next/image"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useRouter } from "next/navigation"

import UiButton from "../../../components/ui/Button/UiButton"
import UiForm from "../../../components/ui/Form/UiForm"
import UiInput from "../../../components/ui/Input/UiInput"
import AuthLayout from "@/components/layout/AuthLayout/AuthLayout"

import loginSchema from '../../../utils/validations/loginSchema'
import styles from '../../../styles/FormStyle.module.scss'
import arrowRight from '../../../public/assets/icons/arrowRight.svg'
import { useLoginUserMutation } from "@/redux/features/account/accountSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function page() {
  const [loginUser, {isLoading}] = useLoginUserMutation();
  const router = useRouter();

  const onSubmit = (userDetails: {email: string, password: string}) => {
    loginUser(userDetails)
    .unwrap()
    .then(()=>{
      router.push('/home')
    })
    .catch((err: { message: string })=>{
      let msg
      if(err.message === 'FirebaseError: Firebase: Error (auth/wrong-password).'){
        msg = 'Email and password do not match'
      }

      if(err.message === "FirebaseError: Firebase: Error (auth/user-not-found)."){
        msg = 'A user with this email does not exsist'
      }
      toast(msg, { type: 'error' })
      console.log(err.message);
    })
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
              label="Email Address"
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
                {isLoading ? 'Loading...' : 'Sign In'}
                {!isLoading && <Image  src={arrowRight} alt="arrow right"/>}
              </UiButton>
              <Link className={styles.signin_up} href='./signup'>
                Dont have an account? sign up
              </Link>
            </div>
          )}
        </UiForm> 
    </div>
    <ToastContainer />
    </AuthLayout>
    
  )
}