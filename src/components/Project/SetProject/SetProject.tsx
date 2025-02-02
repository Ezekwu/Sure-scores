'use client'

import { useEffect, useMemo, useState } from 'react';
import { getAuth } from 'firebase/auth';

import UiModal from '../../ui/Modal/UiModal';
import UiInput from '../../ui/Input/UiInput';
import UiTextArea from '../../ui/TextArea/UiTextArea';
import UiForm from '../../ui/Form/UiForm';
import UidatePicker from '../../ui/DatePicker/UiDatePicker';
import UiButton from '../../ui/Button/UiButton';
import styles from './setProject.module.scss';
import UiIcon from '../../ui/Icon/UiIcon';
import Image from 'next/image';
import UploadImage from 'public/assets/images/upload-image.png';
import InsertLink from '../../InsertLink/InsertLink';
import useToggle from '@/utils/hooks/useToggle';
import Link from '@/types/Link';
import UiLinkTag from '@/components/ui/LinkTag/UiLinkTag';
import UiFileUpload from '@/components/ui/FileUpload/UiFileUpload';
import UiFilePreview from '../../ui/FilePreview/UiFilePreview';
import { FileData } from '../../ui/FilePreview/UiFilePreview';
import { formatFileSize } from '@/utils/helperFunctions';
import UiSelect, { Option } from '../../ui/Select/UiSelect';
import { Priority } from '@/types/enums/Priority';
import AddProjectSchema from '@/utils/validations/AddProjectSchema';
import useCloudinaryUpload from '@/utils/hooks/useCloudinaryUpload';
import { serverTimestamp } from 'firebase/firestore';
import { useAddProjectMutation } from '@/redux/features/Projects';
import Project from '@/types/Project';
import { Toast } from '@/utils/toast';
import { generateProjectNumber } from '@/utils/helperFunctions';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: Project;
}

export default function SetProject({ isOpen, defaultProject, onClose }: Props) {
  const [links, setLinks] = useState<Link[]>(defaultProject?.links || []);
  const [uploadedAvatar, setUploadedAvatar] = useState<File[] | null>(null);
  const [previewUploadedAvatar, setPreviewUploadedAvatar] = useState<string | undefined>(defaultProject?.avatar);
  const [files, setFiles] = useState<File[]>([]);
  const [filesPreview, setFilesPreview] = useState<FileData[]>(
    defaultProject?.files || [],
  );
  const [projectAvatar, setProjectAvatar] = useState<string>();

  const isInsertLinkVisible = useToggle();
  const isManualLoading = useToggle();

  const attachmentLength = files.length + links.length;

  const { uploadFiles } = useCloudinaryUpload();

  const [addProject, { isLoading }] = useAddProjectMutation();

  const loading = isManualLoading.value || isLoading;

  console.log(isLoading, isManualLoading.value);
  
  const auth = getAuth();
  const user = auth.currentUser;

  const projectPriorityOptions: Option[] = useMemo(() => {
    return Object.values(Priority).map((priority) => ({
      label: priority,
      value: priority,
    }));
  }, []);

  function handleSetLinks(link: Link) {
    return setLinks((prevLinks) => [...prevLinks, link]);
  }

  function removeLink(index: number) {
    const linksCopy = [...links];
    linksCopy.splice(index, 1);
    setLinks(linksCopy);
  }

  function removeFile(index: number) {
    const filesCopy = [...files];
    filesCopy.splice(index, 1);
    setFiles(filesCopy);
  }

  function handleUploadedAvatar(img: File[]) {
    return setUploadedAvatar(img);
  }

  function handleSetFiles(files: File[]) {
    return setFiles(files);
  }

  function clearAvatars() {
    setPreviewUploadedAvatar(undefined);
    setProjectAvatar(undefined);
    setUploadedAvatar(null);
  }

  // const formattedDefaultProject = {
  //   ...defaultProject,
    
  //   start_date: new Date(defaultProject?.start_date ),
  //   dead_line: new Date(defaultProject?.dead_line ),
  // } as Project

  async function onSubmit(data: Project) {
    if (!user) throw new Error('No current logged in user');

    try {
      isManualLoading.on();
      let formatedData: Project = { ...data };
      let uploadedAvatarUrl = undefined;
      
      if (uploadedAvatar) {
        const avatarUploadData = await uploadFiles(uploadedAvatar);
        if (avatarUploadData) {
          uploadedAvatarUrl = avatarUploadData[0].src;
        }
      }

      if (files.length > 0) {
        const uploadedFiles = await uploadFiles(files);

        if (uploadedFiles) {
          formatedData = {
            ...formatedData,
            files: [...uploadedFiles],
          };
        }
      }

      formatedData = {
        ...formatedData,
        created_at: serverTimestamp(),
        links: links,
        avatar: uploadedAvatarUrl || projectAvatar,
        project_number: generateProjectNumber(),
        tasks: [],
        reporter_id: user?.uid,
      };

      console.log('step 4', formatedData);


      if (!uploadedAvatar && !projectAvatar) {
        formatedData = {
          ...formatedData,
          avatar: '/assets/images/abstract-sunset.png',
        };
      }

      console.log('step 5', formatedData);

      addProject(formatedData)
        .unwrap()
        .then(() => {
          onClose();
          Toast.success({ msg: 'event successfully added' });
        });
    } catch (error) {
      isManualLoading.off();
      console.log(error);
    }
    
  }

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

  useEffect(() => {
    function previewFiles() {
      const previewUrls = files.map((file) => {
        return {
          name: file.name,
          size: formatFileSize(file.size),
          type: file.type,
          src: URL.createObjectURL(file),
        };
      });
      setFilesPreview(previewUrls);
    }
    previewFiles();
  }, [files]);

  useEffect(() => {
    if (uploadedAvatar) {
      const avatarUrl = URL.createObjectURL(uploadedAvatar[0]);
      setPreviewUploadedAvatar(avatarUrl);
    }
  }, [uploadedAvatar]);

  return (
    <UiModal
      closeModal={() => {
        onClose();
        clearAvatars();
        setFiles([]);
        setLinks([]);
        setFilesPreview([]);
        isManualLoading.off();
      }}
      isOpen={isOpen}
      isFullWidth={true}
      title={
        <h2
          style={{
            fontSize: '2rem',
          }}
        >
          {defaultProject ? 'Update' : 'Add'} Project
        </h2>
      }
    >
      <UiForm
        defaultValues={defaultProject}
        schema={AddProjectSchema}
        onSubmit={onSubmit}
      >
        {({ errors, register, control }) => (
          <div className={styles.addProject}>
            <section className={styles.top_row}>
              <div className={styles.form_col}>
                <div className={styles.addProject_form}>
                  <UiInput
                    name="name"
                    register={register}
                    control={control}
                    error={errors.name?.message}
                    label="Project Name"
                    placeholder="Project Name"
                  />
                  <div className={styles.date_container}>
                    <UidatePicker
                      control={control}
                      label="Starts"
                      name="start_date"
                      error={errors.start_date?.message}
                    />
                    <UidatePicker
                      control={control}
                      label="Dead Line"
                      name="dead_line"
                      error={errors.dead_line?.message}
                    />
                  </div>
                  <UiSelect
                    label="Priority"
                    name="priority"
                    error={errors.priority?.message}
                    options={projectPriorityOptions}
                    placeholder="Priority"
                    control={control}
                  />
                  <UiTextArea
                    label="Description"
                    name="description"
                    error={errors.description?.message}
                    register={register}
                    placeholder="Add some description of the project"
                  />
                </div>
              </div>
              <div className={styles.project_avatar_link_col}>
                <div className={styles.project_avatar}>
                  <h3>Select image</h3>
                  <p>
                    vSelect or upload an avatar for the project (available
                    formats: jpg, png)
                  </p>
                  <div className={styles.avatar_grid}>
                    {projectImages.map((image) => (
                      <div
                        className={`${projectAvatar === `/assets/images/${image}` && styles.avatar_active} ${styles.avatar_wrappper}`}
                        onClick={() => {
                          setProjectAvatar(`/assets/images/${image}`);
                          setUploadedAvatar(null);
                          setPreviewUploadedAvatar(undefined);
                        }}
                        key={image}
                      >
                        <Image
                          width={47}
                          height={47}
                          src={`/assets/images/${image}`}
                          alt={image}
                        />
                      </div>
                    ))}
                    <UiFileUpload
                      fileType="image"
                      onSetFiles={handleUploadedAvatar}
                    >
                      {({ openFileWindow }) => (
                        <Image
                          width={45}
                          height={45}
                          className={`${styles.uploadImage} ${previewUploadedAvatar && styles.isImageUploaded}`}
                          src={previewUploadedAvatar || UploadImage}
                          alt="upload image"
                          onClick={() => {
                            openFileWindow();
                            // clearAvatars();
                          }}
                        />
                      )}
                    </UiFileUpload>
                  </div>
                </div>
                {attachmentLength > 0 && (
                  <div className={styles.attachments}>
                    <h3>Attachments ({attachmentLength})</h3>
                    <div className={styles.filesList}>
                      {filesPreview.map((preview, index) => (
                        <UiFilePreview
                          key={preview.src}
                          fileData={preview}
                          isUploadPreview
                          index={index}
                          removeFile={removeFile}
                        />
                      ))}
                    </div>
                    <div className={styles.links}>
                      {links.map((link, index) => (
                        <UiLinkTag
                          key={link.url}
                          link={link}
                          index={index}
                          isRemovable
                          removeLink={removeLink}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div className={styles.attach_link}>
                  <UiFileUpload onSetFiles={handleSetFiles} acceptMultiple />
                  <UiButton
                    onClick={() => isInsertLinkVisible.on()}
                    size="icon"
                    variant="light-blue"
                    type="button"
                  >
                    <UiIcon icon="Link" size="24" />
                  </UiButton>
                </div>
              </div>
            </section>
            <section className={styles.bottom_row}>
              <UiButton loading={loading}>Save Project</UiButton>
            </section>
          </div>
        )}
      </UiForm>
      <InsertLink
        onClose={() => isInsertLinkVisible.off()}
        isOpen={isInsertLinkVisible.value}
        handleSetLinks={handleSetLinks}
      />
    </UiModal>
  );
}
