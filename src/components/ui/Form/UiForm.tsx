"use client" ;

import { useForm, SubmitHandler, FieldErrors , UseFormRegister, Controller, FieldValues} from 'react-hook-form'
import { yupResolver} from '@hookform/resolvers/yup'
import styles from './form.module.scss'

interface Props {
  schema?: any;
  defaultValues?: {
    [x: string]: any;
};
  onSubmit: SubmitHandler<any>;
  children: ( methods: any
) => React.ReactNode
}
export default function UiForm({ onSubmit, children, schema, defaultValues } : Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}> 
      <div className={styles.form__wrapper}>
        {children({errors, register, control})}
      </div>
    </form>
  )
}