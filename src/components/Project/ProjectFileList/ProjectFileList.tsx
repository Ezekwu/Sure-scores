import Link from "next/link";

import UiFilePreview, { FileData } from "@/ui/FilePreview/UiFilePreview";
import UiModal from "@/ui/Modal/UiModal"

import styles from './projectFileList.module.scss'

interface Props {
  isOpen: boolean;
  onClose: () => void;
  files: FileData[]
}

export default function ProjectFileList({ isOpen, files, onClose,  }: Props) {
  
  return (
    <UiModal title="Project files" closeModal={onClose} isOpen={isOpen}>
      <div className={styles.file_list}>
        {files.map((file, index) => (
          <Link key={index} href={file.src} target="_blank" rel="noopener noreferrer">
            <UiFilePreview fileData={file} />
          </Link>
        ))}
      </div>
    </UiModal>
  );
}
