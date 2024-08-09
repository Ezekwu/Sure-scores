import { useMemo } from "react";
import { Control, FieldErrors, FieldValues, UseFormRegister, Controller } from "react-hook-form";
import UiSelect from "../ui/Select/UiSelect";
import styles from '@/styles/FormStyle.module.scss';
import { Option } from "../ui/Select/UiSelect";
import {  expertiseLevel } from "@/utils/constants";
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
  const roleLevelOptions: Option[] = expertiseLevel.map((level) => ({
    label: level,
    value: level,
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
      <UiInput
        register={register}
        error={errors?.user_role?.message}
        name="user_role"
        label="Role"
        placeholder="enter your role"
      />
      <Controller
        name="role_level"
        control={control}
        render={({ field: { name, onChange, value } }) => (
          <UiSelect
            label="level of expertise?"
            name={name}
            error={errors.role_level?.message}
            onChange={onChange}
            options={roleLevelOptions}
            register={register}
            value={value}
            control={control}
          />
        )}
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
    </div>
  );
}