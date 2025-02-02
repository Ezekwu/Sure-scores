
import UiModal from '@/components/ui/Modal/UiModal';
import UiLinkTag from "@/components/ui/LinkTag/UiLinkTag";

import Link from "@/types/Link";

import styles from './projectLinkList.module.scss'

interface Props {
  isOpen: boolean;
  onClose: () => void;
  links: Link[]
}

export default function ProjectLinkList({ isOpen, links, onClose }:Props) {  
  return (
    <UiModal isOpen={isOpen} title="Project links" closeModal={onClose}>
      <div className={styles.link_list}>
        {links.map((link) => (
          <UiLinkTag key={link.url} link={link} />
        ))}
      </div>
    </UiModal>
  );
}
