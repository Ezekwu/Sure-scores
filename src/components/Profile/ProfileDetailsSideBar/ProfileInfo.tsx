import styles from './profileInfo.module.scss'
import Avatar from '@/public/assets/images/avatar.png';
import Image from 'next/image';
import UiButton from '../../ui/Button/UiButton';
import UiIcon from '../../ui/Icon/UiIcon';
import CompanyMember from '@/types/CompanyMember';
import { useGetCompanyRefQuery } from '@/redux/features/Team';
import { getCookie } from 'cookies-next';
import { Icons } from '@/components/ui/Icon/UiIcon';

interface Props {
  user: CompanyMember;
}

export default function ProfileInfo({user}: Props) {
  const companyId = getCookie('active_companyId');
  const {data: company} = useGetCompanyRefQuery(companyId);
  type Field = {
    label: string;
    key: keyof CompanyMember;
    icon: Icons | null;
  };
  const mainInfo: Field[] = [
    { label: 'Position', key: 'user_role', icon: null },
    { label: 'Birthday Date', key: 'birthday', icon: 'CalendarThin' },
  ];

  const contactInfo: Field[] = [
    { label: 'Email', key: 'email', icon: 'Message' },
    { label: 'Mobile Number', key: 'phone', icon: null },
  ];

  const renderFields = (fields: Field[]) => {
    return fields.map((field) => (
      <div key={field.key}>
        <label>{field.label}</label>
        <div className={styles.input_wrapper}>
          <input value={`${user[field.key]}`} readOnly />
          {field.icon && (
            <div className={styles.icon}>
              <UiIcon size="24" icon={field.icon} />
            </div>
          )}
        </div>
      </div>
    ));
  }
  
  return (
    <aside className={styles.sideBar}>
      <header>
        <Image src={Avatar} alt="profile image" />
        <h3>{user.name}</h3>
        <p>{user.user_role}</p>
        <UiButton
          type="button"
          variant="secondary"
          onClick={() => {}}
          size="icon"
        >
          <UiIcon icon="Edit" size="24" />
        </UiButton>
      </header>
      <section>
        <div>
          <h4>Main info</h4>
          <div className={styles.main_info}>
            <div className={styles.field}>{renderFields(mainInfo)}</div>
            <div>
              <label>Company</label>
              <div className={styles.input_wrapper}>
                <input value={company?.name} readOnly />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4>Contact Info</h4>
          <div className={styles.field}>{renderFields(contactInfo)}</div>
        </div>
      </section>
    </aside>
  );
}
