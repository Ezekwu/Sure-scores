"use client"

import styles from './profileDetails.module.scss';
import ProfileInfo from '../ProfileDetailsSideBar/ProfileInfo';
import UiTab from '@/src/components/ui/Tab/UiTab';
import MemberCard from '../../Team/MemberCard/MemberCard';
import { usePathname, useSearchParams } from 'next/navigation';
import { useGetMemberQuery, useGetMembersQuery } from '@/src/redux/features/Team';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import NoProject from '@/public/assets/images/no-task.png'
import UiButton from '../../ui/Button/UiButton';
import UiIcon from '../../ui/Icon/UiIcon';
import EmptyState from '@/src/components/ui/EmptyState/EmptyState';

interface Props {
  memberId: string
}

export default function ProfileDetails({memberId}: Props) {
  const companyId = getCookie('active_companyId');
  const {data: member, isLoading} = useGetMemberQuery({companyId, memberId});
  const {data: members} = useGetMembersQuery(companyId)
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const query = `?${searchParams.toString()}`;
  const queryParams = new URLSearchParams(query);
  const activeDisplay = queryParams.get('view') || 'projects';
  const tabs = [
    {
      label: 'Projects',
      url: `${pathName}?`,
    },
    {
      label: 'Team',
      url: `${pathName}?view=team`,
    },
  ];

  if(isLoading){
    return 'Loading...'
  }
  
  return (
    <section className={styles.wrapper}>
      <ProfileInfo user={member!} />
      <main>
        <div className={styles.tab}>
          <UiTab tabs={tabs} activeTab={pathName + query} />
        </div>
        {activeDisplay === 'projects' ? (
          <div>
            {true && (
              <EmptyState
                text="There are no projects yet Let's add them"
                img={NoProject}
                cta={
                  <UiButton>
                    {' '}
                    <UiIcon size="24" icon="Plus" /> Add Project
                  </UiButton>
                }
              />
            )}
          </div>
        ) : (
          <div className={styles.team_grid}>
            {members?.map((member) => (
              <MemberCard member={member} key={member.id} simplified />
            ))}
          </div>
        )}
      </main>
    </section>
  );
}