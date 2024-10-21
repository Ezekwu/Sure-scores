import Image, { StaticImageData } from "next/image";
import styles from './emptyState.module.scss';

interface Props {
  text: string;
  img: StaticImageData;
  cta: React.ReactNode;
}

export default function EmptyState({cta, img, text}: Props) {
  return (
    <div className={styles.empty_state}>
      {img && <Image alt="empty state image" src={img} />}
      <p>{text}</p>
      <div>{cta}</div>
    </div>
  );
}