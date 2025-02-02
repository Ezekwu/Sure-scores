'use client'

import { useParams } from 'next/navigation';
import ProfileDetails from '@/components/Profile/ProfileDetails/ProfileDetails';
import styles from './page.module.scss'
import Link from 'next/link';
import UiIcon from '@/components/ui/Icon/UiIcon';

export default function Page(){
  const { member } = useParams();

  return (
    <div className={styles.wrapper}>
      <Link className={styles.back_link} href="/team">
        <UiIcon icon="ArrowLeft" size="24" />
        <p>Back to team page</p>
      </Link>
      <h2>Employee’s Profile</h2>
      <ProfileDetails memberId={member as string} />
    </div>
  );
}
