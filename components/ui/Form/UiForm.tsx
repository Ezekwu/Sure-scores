"use client" ;

import { useForm, SubmitHandler, FieldErrors , UseFormRegister} from 'react-hook-form'
import { yupResolver} from '@hookform/resolvers/yup'

interface Props {
  schema?: any;
  onSubmit: SubmitHandler<any>;
  children: ( methods: any
) => React.ReactNode
}
export default function UiForm({ onSubmit, children, schema } : Props) {
  const   {  handleSubmit, register, formState:{errors} } = useForm({
    resolver: yupResolver(schema)
  });

  return (
      <form onSubmit={handleSubmit(onSubmit)}> 
        {children({errors, register})}
      </form>
  )
}