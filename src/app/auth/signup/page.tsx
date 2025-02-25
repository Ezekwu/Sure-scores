'use client'

import { useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/navigation';
import AuthLayout from '../Authlayout';
import SignUpUser from '@/types/SignUpUser';
import { useState } from 'react';
import { Step } from '@/components/ui/Steps/UiSteps';
import UiButton from '@/components/ui/Button/UiButton';
import styles from './signup.module.scss';
import Link from 'next/link';
import ArrowRightSvg from 'public/assets/icons/ArrowRightSvg';
import UiForm from '@/components/ui/Form/UiForm';
import RegistrationSchema from '@/utils/validations/RegistrationSchema';
import CompanyDetailsSchema from '@/utils/validations/CompanyDetailsSchema';
import PersonalDetailsSchema from '@/utils/validations/PersonalDetailsSchema';
import { useRegisterUserMutation } from '@/redux/features/Account';
import UiIcon from '@/components/ui/Icon/UiIcon';

const RegisterationForm = dynamic(
  () => import('@/components/auth/RegisterationForm'),
);
const CompanyDetailsForm = dynamic(
  () => import('@/components/auth/CompanyDetailsForm'),
);
const PersonalDetailsForm = dynamic(
  () => import('@/components/auth/PersonalDetailsForm'),
);

export default function Page() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [inviteToken, setIniteToken] = useState<string | null>(null);
  
  const router = useRouter();
  const [registerUser, {isLoading}] = useRegisterUserMutation();
  const steps: Step[] = [
    {
      content: 'Submit your email phone and password',
      title: 'Register to work room',
    },
    {
      content: 'Tell us about yourself',
      title: 'Tell us about yourself',
    },
    {
      content: 'Tell us about your company',
      title: 'Tell us about your company',
    },
  ].filter(
    (step) => !(step.title === 'Tell us about your company' && inviteToken),
  );

  const isLastStep = activeStepIndex === steps.length - 1;
  
  function goNext() {
    if(activeStepIndex < (steps.length -1)){
      setActiveStepIndex((prevState) => prevState + 1)
    }
  }

  function goPrevious() {
    if(activeStepIndex > 0) {
      setActiveStepIndex((prevState) => prevState - 1);
    }
  }

  const activeSchema = useMemo(() => {
    switch (activeStepIndex) {
      case 0:
        return RegistrationSchema;
      case 1:
        return PersonalDetailsSchema;
      case 2:
        return CompanyDetailsSchema;
      default:
        break;
    }
  }, [activeStepIndex]);

  const onSubmit = (userDetails: SignUpUser) => {
    if (isLastStep) {      
      registerUser(userDetails)
        .unwrap()
        .then(() => {
          router.push('/dashboard');
        });
    } else {
      goNext();
    }
  };  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setIniteToken(params.get('invite-token'));
    }
  }, []);


  return (
    <div className={styles.signup}>
      <AuthLayout steps={steps} currentStepIndex={activeStepIndex}>
        <section>
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '0.875rem',
                fontWeight: 'bold',
                color: '#3F8CFF',
              }}
            >
              Step {activeStepIndex + 1}/{steps.length}
            </p>
            <h2
              style={{
                fontSize: '1.3rem',
                marginBottom: '2rem',
              }}
            >
              {steps[activeStepIndex].title}
            </h2>
          </div>
          <div>
            <UiForm onSubmit={onSubmit} schema={activeSchema}>
              {({ errors, register, control }) => (
                <div>
                  <div className={styles.form_container}>
                    {activeStepIndex === 0 && (
                      <RegisterationForm
                        control={control}
                        errors={errors}
                        register={register}
                      />
                    )}
                    {activeStepIndex === 1 && (
                      <PersonalDetailsForm
                        control={control}
                        errors={errors}
                        register={register}
                      />
                    )}
                    {activeStepIndex === 2 && !inviteToken && (
                      <CompanyDetailsForm
                        control={control}
                        errors={errors}
                        register={register}
                      />
                    )}
                  </div>
                  <section className={styles.buttons_container}>
                    {activeStepIndex === 0 ? (
                      <Link className={styles.signin_up} href="./login">
                        Alredy have an account? sign in.
                      </Link>
                    ) : (
                      <UiButton
                        type="button"
                        variant="primary-text"
                        onClick={goPrevious}
                      >
                        <UiIcon icon="ArrowLeft" size="24" />
                        Previous
                      </UiButton>
                    )}
                    <UiButton loading={isLoading}>
                      {isLastStep ? 'submit' : 'next'} <ArrowRightSvg />
                    </UiButton>
                  </section>
                </div>
              )}
            </UiForm>
          </div>
        </section>
      </AuthLayout>
    </div>
  );
}
