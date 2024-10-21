'use client'

import UiModal from '../../ui/Modal/UiModal';
import UiInput from '../../ui/Input/UiInput';
import UiTextArea from '../../ui/TextArea/UiTextArea';
import UiForm from '../../ui/Form/UiForm';
import UidatePicker from '../../ui/DatePicker/UiDatePicker';
import UiButton from '../../ui/Button/UiButton';
import styles from './addProject.module.scss';
import UiIcon from '../../ui/Icon/UiIcon';
import Image from 'next/image';
import UploadImage from '@/public/assets/images/upload-image.png';

export default function AddProject() {
  const projectImages = [
    'abstract-sunset.png',
    'color-splash.png',
    'cosmic-dots.png',
    'geometric-pop.png',
    'bubble-pattern-eggplant.png',
    'bubble-pattern-green.png',
    'bubble-pattern-lightblue.png',
    'bubble-pattern-primary.png',
    'bubble-pattern-purple.png',
    'bubble-pattern-red.png',
    'bubble-pattern-yellow.png',
  ];


  return (
    <UiModal
      closeModal={() => {}}
      isOpen={true}
      isFullWidth={true}
      title={
        <h2
          style={{
            fontSize: '2rem',
          }}
        >
          Add Project
        </h2>
      }
    >
      <div className={styles.addProject}>
        <section className={styles.top_row}>
          <div className={styles.form_col}>
            <UiForm onSubmit={() => {}}>
              {({ errors, register, control }) => (
                <div className={styles.addProject_form}>
                  <UiInput
                    name="project_name"
                    register={register}
                    control={control}
                    label="Project Name"
                    placeholder="Project Name"
                  />
                  <div className={styles.date_container}>
                    <UidatePicker
                      control={control}
                      label="Starts"
                      name="start_date"
                    />
                    <UidatePicker
                      control={control}
                      label="Dead Line"
                      name="dead_line"
                    />
                  </div>
                  <UiTextArea
                    label="Description"
                    name="description"
                    register={register}
                    placeholder="Add some description of the project"
                  />
                </div>
              )}
            </UiForm>
          </div>
          <div className={styles.project_avatar_link_col}>
            <div className={styles.project_avatar}>
              <h3>Select image</h3>
              <p>
                vSelect or upload an avatar for the project (available formats:
                jpg, png)
              </p>
              <div className={styles.avatar_grid}>
                {projectImages.map((image) => (
                  <Image
                    width={45}
                    height={45}
                    className=''
                    key={image}
                    src={`/assets/images/${image}`}
                    alt={image}
                  />
                ))}
                <Image
                  width={45}
                  height={45}
                  src={UploadImage}
                  alt="upload image"
                />
              </div>
            </div>
            <div className={styles.attach_link}>
              <UiButton size="icon" variant="egg-plant">
                <UiIcon icon="Attach" size="24" />
              </UiButton>
              <UiButton size="icon" variant="light-blue">
                <UiIcon icon="AddLink" size="24" />
              </UiButton>
            </div>
          </div>
        </section>
        <section className={styles.bottom_row}>
          <UiButton>Save Project</UiButton>
        </section>
      </div>
    </UiModal>
  );
}