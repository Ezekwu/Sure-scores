import styles from './linkTag.module.scss';
import Link from '@/src/types/Link';
import UiIcon from '../Icon/UiIcon';

interface Props {
  link: Link;
  index: number;
  removeLink:(index: number)=> void
}

export default function UiLinkTag({ link, index, removeLink }: Props) {
  return (
    <div className={styles.linkTag}>
      <a className={styles.link} href={link.url} target="_blank" rel="noopener noreferrer">
        {' '}
        <UiIcon icon="Link" size="20" /> {link.text}{' '}
      </a>
      <button onClick={() => removeLink(index)}>
        <UiIcon icon="X" size="14" />
      </button>
    </div>
  );
}