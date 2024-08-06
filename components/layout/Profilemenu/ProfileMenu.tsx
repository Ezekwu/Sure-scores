'use client';
import styles from './profilemenu.module.scss';
import UiIcon from '@/components/ui/Icon/UiIcon';
import useToggle from '@/utils/hooks/useToggle';
import OutsideClickHandler from 'react-outside-click-handler';

export type Options = {
  label: React.ReactNode;
  func: () => void;
  isDanger?: boolean
};

interface Props {
  header: React.ReactNode;
  options: Options[];
}

export default function ProfileMenu({ header, options }: Props) {
  const isMenuVisible = useToggle();

  return (
    <OutsideClickHandler onOutsideClick={() => isMenuVisible.off()}>
      <div className={styles.profieMenu}>
        <button
          type="button"
          className={styles.trigger}
          onClick={() => isMenuVisible.toggle()}
        >
          <p>{header}</p>
          <UiIcon icon={isMenuVisible.value ? "CaretUp" : "CaretDown"} size="24" />
        </button>
        {isMenuVisible.value && (
          <ul>
            <div className={styles.list_wrapper}>
              {options.map((item, index) => (
                <li key={index} onClick={item.func}>
                  {item.label}
                </li>
              ))}
            </div>
          </ul>
        )}
      </div>
    </OutsideClickHandler>
  );
}
