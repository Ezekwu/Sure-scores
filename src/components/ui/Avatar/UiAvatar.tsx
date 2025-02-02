import Image from "next/image";

import Avatar from 'public/assets/images/avatar.png';

import styles from './avatar.module.scss';

interface Props {
  imgSrc?: string
}

export default function UiAvatar({ imgSrc }: Props) {
  return (
    <Image width={24} height={24} className={styles.avatar} src={imgSrc || Avatar} alt="avatar" />
  );
}
