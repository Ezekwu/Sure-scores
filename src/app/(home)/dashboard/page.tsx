'use client';

import styles from './page.module.scss';
import UiIcon from '@/components/ui/Icon/UiIcon';
import Link from 'next/link';
import EventDetailsCard from '@/components/Event/EventDetailsCard/EventDetailsCard';
import MemberCard from '@/components/Team/MemberCard/MemberCard';
import { useGetLoggedInUserQuery } from '@/redux/features/Account';
import { useGetMembersQuery } from '@/redux/features/Team';
import { getAuth } from 'firebase/auth';
import { formatDate } from '@/utils/helperFunctions';
import { useGetEventsQuery } from '@/redux/features/Events';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export default function Page() {
  const companyId = getCookie('active_companyId');
  const [compId, setCompId] = useState(companyId);
  const {data: loggedInUser, isLoading: userLoading} = useGetLoggedInUserQuery({});
  const { data: events, isLoading: eventsLoading } = useGetEventsQuery(
    compId!,
    {
      skip: !compId,
    },
  );
  const {data: members, isLoading: membersLoading} = useGetMembersQuery(companyId);
  const firstName = loggedInUser?.name?.split(' ')[0];
  const user = getAuth();
  const creationDate = formatDate(user.currentUser?.metadata.creationTime!, 'MMM D, YYYY');
  const currentDate = formatDate(new Date().toDateString(), 'MMM D, YYYY');
  const isLoading = userLoading || eventsLoading || membersLoading;

  useEffect(() => {
    const newCompanyId = getCookie('active_companyId');
    if (newCompanyId !== companyId) {
      setCompId(newCompanyId);
    }
  }, [compId, companyId]);

  if (isLoading) {
    return 'loading...'
  }
  
  return (
    <main className={styles.dashboard}>
      <div className={styles.welcome_timeRange}>
        <div className={styles.welcome}>
          <p>Welcome back, {firstName}!</p>
          <h2>Dashboard</h2>
        </div>
        <span className={styles.timeRange}>
          <UiIcon icon="Calendar" size="24" />{' '}
          <div>
            {creationDate} - {currentDate}
          </div>
        </span>
      </div>
      <section className={styles.main_layout}>
        <section className={styles.team_events_container}>
          <div className={styles.team}>
            <div className={styles.team_header}>
              <h3>Team</h3>
              <Link className={styles.view_all} href="./team">
                View all <UiIcon icon="CaretRight" size="24" />
              </Link>
            </div>
            <div className={styles.team_grid}>
              {members?.map((member) => (
                <Link href={`/team/${member.id}`} key={member.id}>
                  <MemberCard
                    member={member}
                    simplified
                    backgroundColor="#F4F9FD"
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.events}>
            {events && events.length < 1 ? (
              <div className={styles.emptyData}>No Events</div>
            ) : (
              <div>
                <div className={styles.events_header}>
                  <h3>Nearest Events</h3>
                  <Link
                    className={styles.view_all}
                    href="/dashboard/event-list"
                  >
                    View all <UiIcon icon="CaretRight" size="24" />
                  </Link>
                </div>
                <div className={styles.eventList}>
                  {events
                    ?.slice(0, 3)
                    .map((event) => (
                      <EventDetailsCard
                        key={event.id}
                        fullDetails={false}
                        event={event}
                        truncateTitle
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        </section>
        <section></section>
      </section>
    </main>
  );
}
