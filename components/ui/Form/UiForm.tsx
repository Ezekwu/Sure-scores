"use client" ;

import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface Props {
  schema?: any;
  onSubmit: SubmitHandler<any>;
  children: ( errors: any
) => React.ReactNode
}
export default function UiForm({ onSubmit, children, schema } : Props) {
  const   {  handleSubmit, register, formState:{errors} } = useForm({
    resolver: yupResolver(schema)
  });

  

  // const submitFunc = (data: any) => {
  //   //  console.log(data);
  //    console.log('data submitted', data)
  //    onSubmit(data)
  // }

  
  return (
      <form onSubmit={handleSubmit(onSubmit)}> 
        {children({errors, register})}
      </form>
  )
}