import styles from './filePreview.module.scss';
import UiIcon from "../Icon/UiIcon";

export type FilePreview = {
  name: string;
  size: string;
  src: string;
  type: string;
};

interface Props {
  filePreview: FilePreview;
  isUploadPreview?: boolean
  index?: number;
  removeFile?: (index:number) => void;
}

export default function UiFilePreview({filePreview, isUploadPreview, index, removeFile}:Props) {
  const isImage = filePreview.type.includes('image/');
  function deleteFile() {
    removeFile!(index!);
  }
  
  return (
    <div
      className={styles.filePreview}
      style={{
        backgroundImage: `linear-gradient(rgba(33, 85, 163, 0.3), rgba(33, 85, 163, 0.3)), url(${isImage ? filePreview.src : '/assets/images/google-docs.png'})`,
      }}
    >
      {isUploadPreview ? (
        <button type='button' onClick={deleteFile} className={styles.remove_attachment}>
          <UiIcon icon="X" />
        </button>
      ) : (
        <span className={styles.attach_icon}>
          <UiIcon icon="Attach" size="24" />
        </span>
      )}

      <div className={styles.file_details}>
        <p className={styles.file_name}>{filePreview.name}</p>
        <p className={styles.file_size}>{filePreview.size}</p>
      </div>
    </div>
  );
}