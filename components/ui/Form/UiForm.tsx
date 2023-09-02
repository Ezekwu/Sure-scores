"use client" ;

import { useForm, SubmitHandler, FormProvider, FieldErrors } from 'react-hook-form'
import { yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface Props {
  schema: any;
  onSubmit: (data: SubmitHandler<any>) => void;
  children: ( errors: FieldErrors<{
    [x: string]: any;
}>
) => React.ReactNode
}
export default function UiForm({ onSubmit, children, schema } : Props) {
  const {  handleSubmit, formState:{errors} } = useForm({
    resolver: yupResolver(schema),
  });
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {children(errors)}
      </form>
    </FormProvider>
  )
}