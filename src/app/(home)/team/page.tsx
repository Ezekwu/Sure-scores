'use client';

import UiButton from '@/src/components/ui/Button/UiButton';
import UiIcon from '@/src/components/ui/Icon/UiIcon';
import UiTable from '@/src/components/ui/Table/UiTable';
import LevelPill from '@/src/components/Team/LevelPill';
import styles from './page.module.scss';
import Avatar from '@/public/assets/images/avatar.png';
import { useGetMembersQuery, useLazyGetMembersQuery } from '@/src/redux/features/Team';
import Image from 'next/image';
import AddMember from '@/src/components/Team/AddMember';
import useToggle from '@/src/utils/hooks/useToggle';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export default function Page() {
  const companyId = getCookie('active_companyId');
  const [compId, setCompId] = useState(companyId);
  const activeCompanyId = getCookie('active_companyId');
  const { data: members, isLoading: isLoading } = useGetMembersQuery(compId, {
    skip: !activeCompanyId,
  });
  // const [triggerGetMembers, {data: Members, isLoading}] = useLazyGetMembersQuery({});

  const isAddMemberVisible = useToggle();  
  
  const headers = [
    { title: 'Email', query: 'email' },
    { title: 'Role', query: 'role' },
    { title: 'Level', query: 'level' },
  ];

  const data = members?.map((member) => {
    return {
      id: member.id,
      lead: (
        <div className="wrapper">
          <Image src={member.img || Avatar} alt="" />
          <div>
            <h3>{member.name}</h3>
            <p>{member.email}</p>
          </div>
        </div>
      ),
      email: member.email,
      role: member.user_role,
      level: <LevelPill level={member.level} />,
    };
  });

  useEffect(() => {
    const newCompanyId = getCookie('active_companyId');
    if (newCompanyId !== companyId) {
      setCompId(newCompanyId);
    }
  }, [compId, companyId]);

  if (isLoading ) {
    return 'loading...';
  }

  return (
    <section className={styles.wrapper}>
      <header>
        <h2>Team Mates ({members?.length})</h2>
        <UiButton onClick={() => isAddMemberVisible.on()}>
          {' '}
          <UiIcon icon="Plus" size="24" /> Add Employee
        </UiButton>
      </header>
      <main>
        <UiTable data={data!} headers={headers} leadItem options />
      </main>
      <AddMember  isOpen={isAddMemberVisible.value} onClose={() => isAddMemberVisible.off()}/>
    </section>
  );
}
