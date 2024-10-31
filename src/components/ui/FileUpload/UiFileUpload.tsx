import { useRef } from "react";
import UiButton from "../Button/UiButton";
import UiIcon from "../Icon/UiIcon";
import styles from './fileUpload.module.scss';

 
interface Props {
  fileType?: 'image' | 'document';
  acceptMultiple?: boolean;
  onSetFiles: (files: File[]) => void;
  children?: (props: { openFileWindow: () => void }) => React.ReactNode;
}

export default function UiFileUpload({fileType, acceptMultiple, onSetFiles, children }:Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileTypes = {
    image: 'image/*',
    document: '.pdf,.doc,.docx,.txt',
  };

  function openFileWindow() {
    if(fileInputRef.current){
      fileInputRef.current.click()
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = event.target.files;    
    if(!selectedFiles) return;
    onSetFiles([...selectedFiles]);
    
  }

  return (
    <div className={styles.fileUpload}>
      <input
        multiple={acceptMultiple}
        accept={fileType ? fileTypes[fileType] : 'image/*,.pdf,.doc,.docx,.txt'}
        type="file"
        onChange={(e) => {
          handleChange(e);
        }}
        ref={fileInputRef}
      />
      {children ? (
        children({ openFileWindow })
      ) : (
        <UiButton
          type="button"
          size="icon"
          variant="egg-plant"
          onClick={openFileWindow}
        >
          <UiIcon icon="Attach" size="24" />
        </UiButton>
      )}
    </div>
    // <Controller
    //   name={name}
    //   control={control}
    //   render={({ field }) => (
    //     <div>
    //       <input
    //         multiple={acceptMultiple}
    //         accept={
    //           fileType ? fileTypes[fileType] : 'image/*,.pdf,.doc,.docx,.txt'
    //         }
    //         type='file'
    //         onChange={(e)=> {
    //           handleChange(e);
    //           field.onChange(e.target.files);
    //         }}
    //       />
    //     </div>
    //   )}
    // />
  );
}