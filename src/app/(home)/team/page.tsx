'use client';

import UiButton from '@/components/ui/Button/UiButton';
import UiIcon from '@/components/ui/Icon/UiIcon';
import UiTable from '@/components/ui/Table/UiTable';
import UiTab from '@/components/ui/Tab/UiTab';
import LevelPill from '@/components/Team/LevelPill/LevelPill';
import MemberCard from '@/components/Team/MemberCard/MemberCard';
import styles from './page.module.scss';
import Avatar from '@/public/assets/images/avatar.png';
import { useGetMembersQuery } from '@/redux/features/Team';
import { useGetLoggedInUserQuery } from '@/redux/features/Account';
import Image from 'next/image';
import AddMember from '@/components/Team/AddMember/AddMember';
import useToggle from '@/utils/hooks/useToggle';
import { getCookie } from 'cookies-next';
import { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { formatDate } from '@/utils/helperFunctions';
import Link from 'next/link';

export default function Page() {
  const companyId = getCookie('active_companyId');
  const [compId, setCompId] = useState(companyId);
  const activeCompanyId = getCookie('active_companyId');
  const { data: members, isLoading: isLoading } = useGetMembersQuery(compId, {
    skip: !activeCompanyId,
  });
  const {data: loggedInUser} = useGetLoggedInUserQuery({});
  const isAddMemberVisible = useToggle();  
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const query = `?${searchParams.toString()}`;
  const queryParams = new URLSearchParams(query);
  const activeDisplay = queryParams.get('view') || 'list';
  
  const tabs = [
    {
      label: 'List',
      url: `${pathName}?`,
    },
    {
      label: 'Activity',
      url: `${pathName}?view=activity`,
    },
  ];
  
  const headers = [
    {title: 'Gender', query: 'gender'},
    { title: 'Birthday', query: 'birthday' },
    { title: 'Role', query: 'role' },
    { title: 'Level', query: 'level' },
  ];

  const membersCopy = members || [];
  
  const sortedMembers = [...membersCopy]?.sort((a, b) => {
    if (a.member_type === 'admin') return -1;
    if (b.member_type === 'admin') return 1;

    if (a.id === loggedInUser?.id) return -1;
    if (b.id === loggedInUser?.id) return 1;

    return 0;
  }); 

  const data = sortedMembers?.map((member) => ({
    id: member.id,
    leadCell: (
      <div className="wrapper">
        <Image src={member.img || Avatar} alt="" />
        <div>
          <h3>{member.name}</h3>
          <p>{member.email}</p>
        </div>
      </div>
    ),
    gender: member.gender,
    birthday: formatDate(member.birthday, 'MMM D, YYYY'),
    role: member.user_role,
    level: <LevelPill level={member.level} />,
  }));

  if (isLoading) {
    return 'loading...'
  }

  return (
    <section className={styles.wrapper}>
      <header className={styles.page_header}>
        <h2>Team Mates ({members?.length})</h2>
        <UiTab activeTab={pathName + query} tabs={tabs} />
        <UiButton onClick={() => isAddMemberVisible.on()}>
          {' '}
          <UiIcon icon="Plus" size="24" /> Add Employee
        </UiButton>
      </header>
      <main>
        {activeDisplay === 'list' ? (
          <UiTable data={data!} headers={headers} leadCell options />
        ) : (
          <div className={styles.activity_view}>
            {sortedMembers?.map((member) => (
              <Link href={`/team/${member.id}`} key={member.id}>
                <MemberCard member={member} />
              </Link>
            ))}
          </div>
        )}
      </main>
      <AddMember
        isOpen={isAddMemberVisible.value}
        onClose={() => isAddMemberVisible.off()}
      />
    </section>
  );
}
