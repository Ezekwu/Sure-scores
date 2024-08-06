'use client'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import '../../../styles/global.css'
import UiButton from "../../../components/ui/Button/UiButton"
import UiForm from "../../../components/ui/Form/UiForm"
import UiInput from "../../../components/ui/Input/UiInput"
import UiIcon from "@/components/ui/Icon/UiIcon";
import AuthLayout from "../Authlayout"
import loginSchema from '../../../utils/validations/loginSchema'
import arrowRight from '../../../public/assets/icons/arrowRight.svg'
import styles from './signin.module.scss'
import { useLoginUserMutation } from "@/redux/features/Account";
import { Toast } from "@/utils/toast"

export default function Page() {
  const [loginUser, {isLoading}] = useLoginUserMutation();
  const router = useRouter();

  const onSubmit = (userDetails: {email: string, password: string}) => {
    loginUser(userDetails)
    .unwrap()
    .then(()=>{
      router.push('/home')
    })
  }

  return (
    <AuthLayout>
      <div className={styles.signin}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '1.3rem',
            marginBottom: '2rem',
          }}
        >
          Sign In to Woorkroom
        </h2>
        <div className={styles.form_container}>
          <UiForm onSubmit={onSubmit} schema={loginSchema}>
            {({ errors, register }) => (
              <div>
                <UiInput
                  register={register}
                  error={errors?.email?.message}
                  name="email"
                  label="Email Address"
                  placeholder="enter your email"
                  type="text"
                />
                <UiInput
                  register={register}
                  error={errors?.password?.message}
                  name="password"
                  label="Password"
                  placeholder="enter your password"
                  type="password"
                />
                <UiButton>
                  {isLoading ? 'Loading...' : 'Sign In'}
                  {!isLoading && <UiIcon size="24" icon="ArrowRight"/>}
                </UiButton>

                <Link href="./signup">Dont have an account? sign up</Link>
              </div>
            )}
          </UiForm>
        </div>
      </div>
    </AuthLayout>
  );
}