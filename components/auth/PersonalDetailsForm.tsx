import { useMemo } from "react";
import { Control, FieldErrors, FieldValues, UseFormRegister, Controller } from "react-hook-form";
import UiSelect from "../ui/Select/UiSelect";
import styles from '@/styles/FormStyle.module.scss';
import { Option } from "../ui/Select/UiSelect";
import { roles } from "@/utils/constants";
import UiInput from "../ui/Input/UiInput";


interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<FieldValues>;
}

export default function PersonalDetailsForm({control, errors, register}:Props) {
  const serviceUseOptions: Option[] = [
    {
      label: 'Work',
      value: 'Work',
    },
    {
      label: 'School',
      value: 'School',
    },
    {
      label: 'Personal Use',
      value: 'Personal Use',
    },
  ];
  const userDescriptionOtions: Option[] = roles.map((role) => ({
    label: role,
    value: role,
  }));

  return (
    <div className={styles.form__wrapper}>
      <UiInput
        register={register}
        error={errors?.name?.message}
        name="name"
        label="Name"
        placeholder="enter your name"
      />
      <Controller
        name="use_for_service"
        control={control}
        render={({ field: { name, onChange, value } }) => (
          <UiSelect
            label="Why will you use the service?"
            name={name}
            error={errors.use_for_service?.message}
            onChange={onChange}
            options={serviceUseOptions}
            register={register}
            value={value}
            control={control}
          />
        )}
      />
      <Controller
        name="user_description"
        control={control}
        render={({ field: { name, onChange, value } }) => (
          <UiSelect
            label="What describes you best?"
            name={name}
            error={errors.user_description?.message}
            onChange={onChange}
            options={userDescriptionOtions}
            register={register}
            value={value}
            control={control}
          />
        )}
      />
    </div>
  );
}