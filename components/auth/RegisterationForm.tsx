import UiInput from "../ui/Input/UiInput";
import styles from '@/styles/FormStyle.module.scss'
import { Control, FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<FieldValues>;
}

export default function RegisterationForm({ errors, register, control}:Props) {
  return (
    <div className={styles.form__wrapper}>
      <UiInput
        register={register}
        error={errors?.email?.message}
        name="email"
        label="Email Address"
        placeholder="enter your email"
      />
      <UiInput
        register={register}
        error={errors?.password?.message}
        name="password"
        label="Create Password"
        placeholder="enter your password"
        type="password"
      />
      <UiInput
        name="phone"
        label="Mobile Number"
        register={register}
        error={errors.phone?.message}
        control={control}
        type="phone"
      />
    </div>
  );
}