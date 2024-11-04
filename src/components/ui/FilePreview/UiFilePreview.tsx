import styles from './filePreview.module.scss';
import UiIcon from "../Icon/UiIcon";
import { formatDate } from '@/src/utils/helperFunctions';

export type FileData = {
  name: string;
  size?: string;
  src: string;
  type: string;
  created_at?: string;
};

interface Props {
  fileData: FileData;
  isUploadPreview?: boolean;
  index?: number;
  removeFile?: (index: number) => void;
}

export default function UiFilePreview({
  fileData,
  isUploadPreview,
  index,
  removeFile,
}: Props) {
  const isImage = fileData.type.includes('image');

  function deleteFile() {
    removeFile!(index!);
  }

  return (
    <div
      className={styles.filePreview}
      style={{
        backgroundImage: `linear-gradient(rgba(33, 85, 163, 0.3), rgba(33, 85, 163, 0.3)), url(${isImage ? fileData.src : '/assets/images/google-docs.png'})`,
        backgroundPosition: 'center'
      }}
    >
      {isUploadPreview ? (
        <button
          type="button"
          onClick={deleteFile}
          className={styles.remove_attachment}
        >
          <UiIcon icon="X" />
        </button>
      ) : (
        <span className={styles.attach_icon}>
          <UiIcon icon="Attach" size="24" />
        </span>
      )}

      <div className={styles.file_details}>
        <p className={styles.file_name}>{fileData.name}</p>
        {fileData.size && <p className={styles.file_size}>{fileData.size}</p>}
        {fileData.created_at && (
          <p className={styles.created_at}>{formatDate(fileData.created_at, 'MMM DD, YYYY | hh:mm A')}</p>
        )}
      </div>
    </div>
  );
}