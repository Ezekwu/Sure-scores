import UiIcon from '@/components/ui/Icon/UiIcon';
import styles from './CustomToolbar.module.scss'

export default function CustomToolbar  ({onNavigate, label}: any) {
  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div onClick={() => onNavigate('PREV')}>
          <UiIcon icon="ArrowLeft" size="24" />
        </div>
        <p onClick={() => onNavigate('TODAY')}>{label}</p>
        <div onClick={() => onNavigate('NEXT')}>
          <UiIcon icon="ArrowRight" size="24" />
        </div>
      </div>
    </div>
  );
}
