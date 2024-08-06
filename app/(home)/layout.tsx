'use client';

import styles from './layout.module.scss';
import '../../styles/global.css';
import Navbar from '@/components/layout/Navbar/Navbar';
import UiIcon from '@/components/ui/Icon/UiIcon';
import { useGetLoggedInUserQuery } from '@/redux/features/Account';
import ProfileMenu, {
  Options,
} from '@/components/layout/Profilemenu/ProfileMenu';
import { Toaster } from 'react-hot-toast';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {data, isLoading} = useGetLoggedInUserQuery({});
  const profileMenuOptions: Options[] = [
    {
      label: 'View Profile',
      func: () => {},
    },
    {
      label: 'Logout',
      func: () => {},
    },
  ];

  const headerContent = (
    <div className={styles.header}>
      <div className={styles.image}></div>
      <p>{data?.name}</p>
    </div>
  );

  
    return (
      <section className={styles.dashboardlayout}>
        <Navbar />
        <div className={styles.children}>
          {isLoading ? (
            <p>loading...</p>
          ) : (
            <div>
              <div className={styles.notification_profile}>
                <div className={styles.wrapper}>
                  <button className={styles.notification}>
                    <UiIcon icon="Bell" size="20" />
                  </button>
                  <ProfileMenu
                    header={headerContent}
                    options={profileMenuOptions}
                  />
                </div>
              </div>
              {children}
            </div>
          )}
        </div>
        <Toaster/>
      </section>
    );
}
