import { Option } from "../Select/UiSelect"
import OutsideClickHandler from 'react-outside-click-handler';
import styles from './dropdown.module.scss';
import useToggle from "@/utils/hooks/useToggle";
import UiIcon from "../Icon/UiIcon";
import { useMemo } from "react";

interface Props {
  options: Option[];
  value: string;
  onChange: (value: string | number) => void;
}


export default function UiDropdown({options, value, onChange}: Props) {
  const isMenuVisible = useToggle();

  function selectOption(value: string | number) {
    onChange(value);
    isMenuVisible.off()
  }

  const valueLabel = useMemo(() => {
    return (
      options?.find((option) => value === option.value)?.label
    );
  }, [value, options]);

  

  return (
    <OutsideClickHandler onOutsideClick={() => isMenuVisible.off()}>
      <div className={styles.dropdown}>
        <button
          type="button"
          className={styles.trigger}
          onClick={() => isMenuVisible.toggle()}
        >
          <div>{valueLabel}</div>
          <UiIcon
            icon={isMenuVisible.value ? 'CaretUp' : 'CaretDown'}
            size="24"
          />
        </button>
        {isMenuVisible.value && (
          <ul>
            <div className={styles.list_wrapper}>
              {options.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    item.func && item.func();
                    selectOption(item.value);
                  }}
                >
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
