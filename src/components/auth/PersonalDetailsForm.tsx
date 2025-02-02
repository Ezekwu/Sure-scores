import { Control, FieldErrors, FieldValues, UseFormRegister, Controller } from "react-hook-form";
import UiSelect from "../ui/Select/UiSelect";
import UidatePicker from "../ui/DatePicker/UiDatePicker";
import styles from 'styles/FormStyle.module.scss';
import { Option } from "../ui/Select/UiSelect";
import {  expertiseLevel } from "@/utils/constants";
import { genders } from "@/utils/constants";
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

  const genderOptions: Option[] = genders.map((gender)=>({
    label: gender,
    value: gender,
  }))

  return (
    <div className={styles.form__wrapper}>
      <UiInput
        register={register}
        error={errors?.name?.message}
        name="name"
        label="Name"
        placeholder="enter your name"
      />
      <UiSelect
        label="Gender"
        name="gender"
        error={errors.gender?.message}
        options={genderOptions}
        control={control}
      />
      <UidatePicker
        label="Birthday"
        name="birthday"
        error={errors.birthday?.message}
        control={control}
      />
      <div className={styles.flex}>
        <UiSelect
          label="level of expertise?"
          name="level"
          error={errors.level?.message}
          options={roleLevelOptions}
          control={control}
        />
        <UiSelect
          label="Use for service?"
          name="use_for_service"
          error={errors.use_for_service?.message}
          options={serviceUseOptions}
          control={control}
        />
      </div>
      <UiInput
        register={register}
        error={errors?.user_role?.message}
        name="user_role"
        label="Role"
        placeholder="enter your role"
      />
    </div>
  );
}
