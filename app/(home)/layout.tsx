'use client';

import styles from './layout.module.scss';
import '../../styles/global.css';
import Navbar from '@/components/layout/Navbar/Navbar';
import UiDropdown from '@/components/ui/Dropdown/UiDropdown';
import UiIcon from '@/components/ui/Icon/UiIcon';
import { useGetLoggedInUserQuery, useGetUserCompaniesQuery } from '@/redux/features/Account';
import ProfileMenu, {
  Options,
} from '@/components/layout/Profilemenu/ProfileMenu';
import { Option } from '@/components/ui/Select/UiSelect';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {data: loggedInUser, isLoading} = useGetLoggedInUserQuery({});
  const companyIds = loggedInUser?.organizations;
  const { data: companies, isLoading: companiesLoading } =
    useGetUserCompaniesQuery(companyIds!, { skip: !companyIds});
  
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

  const dropdoanOptions: Option[] = [
    {
      label: 'Codexx',
      value: 'Codexx',
    },
    {
      label: 'Truck dispatch',
      value: 'Truck dispatch',
    },
    {
      label: 'Sweetch Pay',
      value: 'Sweetch Pay',
    },
  ];


  const headerContent = (
    <div className={styles.header}>
      <div className={styles.image}></div>
      <p>{loggedInUser?.name}</p>
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
              <div className={styles.notification_organisation_profile}>
                <div className={styles.organisation}>
                  <UiDropdown
                    value="Codexx"
                    onChange={() => {}}
                    options={dropdoanOptions}
                  />
                </div>
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
      </section>
    );
}
