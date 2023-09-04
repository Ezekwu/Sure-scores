"use client" ;

import { useForm, SubmitHandler, FormProvider, FieldErrors } from 'react-hook-form'
import { yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface Props {
  schema: any;
  onSubmit: () => void;
  children: ( errors: any
) => React.ReactNode
}
export default function UiForm({ onSubmit, children, schema } : Props) {
  const   {  handleSubmit, register, formState:{errors} } = useForm({
    resolver: yupResolver(schema)
  });
  const methods = useForm({
    resolver: yupResolver(schema)
  })
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {children({errors, register})}
      </form>
    </FormProvider>
  )
}