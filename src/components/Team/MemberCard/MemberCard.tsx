import CompanyMember from '@/src/types/CompanyMember';
import styles from './memberCard.module.scss';
import LevelPill from '../LevelPill/LevelPill';
import Avatar from '@/public/assets/images/avatar.png';
import Image from 'next/image';

interface Props {
  member: CompanyMember;
  simplified?: boolean;
  backgroundColor?: string;
}
export default function MemberCard({member, simplified, backgroundColor}: Props) {
  
  return (
    <article
      className={`${styles.memberCard} ${simplified && styles.simplifiedCard}`}
    >
      <header
        style={{
          backgroundColor: backgroundColor,
        }}
        className={styles.memberCard_header}
      >
        <div>
          <Image
            className={styles.member_img}
            src={member.img || Avatar}
            alt="profile image"
          />
          <h3>{member.name}</h3>
          <p>{member.user_role}</p>
          <div className={styles.levelPill}>
            <LevelPill level={member.level} />
          </div>
        </div>
      </header>
      <section className={styles.task_info}>
        <div>
          <h4>3</h4>
          <p>Backlog tasks</p>
        </div>
        <div>
          <h4>12</h4>
          <p>Tasks In Progress</p>
        </div>
        <div>
          <h4>24</h4>
          <p>Tasks In Review</p>
        </div>
      </section>
    </article>
  );
}