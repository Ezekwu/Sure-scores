'use client';

import styles from './layout.module.scss';
import '../../../styles/global.css';
import Navbar from '@/src/components/layout/Navbar/Navbar';
import UiDropdown from '@/src/components/ui/Dropdown/UiDropdown';
import UiIcon from '@/src/components/ui/Icon/UiIcon';
import {
  useGetLoggedInUserQuery,
  useGetUserCompaniesRefQuery,
} from '@/src/redux/features/Account';
import ProfileMenu, {
  Options,
} from '@/src/components/layout/Profilemenu/ProfileMenu';
import { useMemo, useState, useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {data: loggedInUser, isLoading: loggedInUserLoading} = useGetLoggedInUserQuery({});
  
  const companyIds = loggedInUser?.organizations;
  const { data: companiesRef, isLoading: companiesLoading, isError: isCompanyError } = useGetUserCompaniesRefQuery(companyIds!, { skip: !companyIds });
  const isLoading = companiesLoading || loggedInUserLoading;
  const activeCompanyId = getCookie('active_companyId');
  const [activeCompId, setActiveCompId] = useState(activeCompanyId);
  
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

  const companiesOptions = useMemo(
    () =>
      companiesRef?.map((companyRef) => ({
        label: companyRef.name,
        value: companyRef.id,
      })),
    [companiesRef],
  );

  const content = useMemo(() => {
    return (
      <div className={styles.header}>
        <div className={styles.image}></div>
        <p>{loggedInUser?.name}</p>
      </div>
    );
  }, [loggedInUser]);
  
  useEffect(() => {
    if (companiesLoading || isCompanyError) return;

    if (!activeCompanyId && companiesRef?.length! > 0) {
      const firstCompanyId = companiesRef![0].id;
      setCookie('active_companyId', firstCompanyId, {
        maxAge: 30 * 24 * 60 * 60,
      });
      setActiveCompId(firstCompanyId);
    }
  }, [
    companiesLoading,
    isCompanyError,
    activeCompanyId,
    companiesRef,
    activeCompId,
  ]);

  if (isLoading ) {
    return 'loading....';
  }

  return (
    <section className={styles.dashboardlayout}>
      <Navbar />
      <div className={styles.children}>
        <div>
          <div className={styles.notification_organisation_profile}>
            <div className={styles.organisation}>
              <UiDropdown
                value={activeCompId!}
                onChange={() => {}}
                options={companiesOptions!}
              />
            </div>
            <div className={styles.wrapper}>
              <button className={styles.notification}>
                <UiIcon icon="Bell" size="20" />
              </button>
              <ProfileMenu header={content} options={profileMenuOptions} />
            </div>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
