import { useMemo, useState, useId } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { Control, FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister } from 'react-hook-form';
import styles from './select.module.scss'
import UiIcon from '../Icon/UiIcon';

export interface Option {
  label: React.ReactNode;
  value: string | number;
}

interface Props {
  label?: string;
  value: string | null | number;
  placeholder?: string;
  /** The name property should always be the same as the model value. example if the input belongs to
   * formData.confirm_password, the name prop should be confirm_password.
   */
  // If there is a need to add extra classes that are not in sync with the design. This is a hack.
  injectedClasses?: string;
  name: string;
  control?: Control<FieldValues>;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  register: UseFormRegister<{
    [x: string]: any;
  }>;
  disabled?: boolean;
  options: Option[];
  hint?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange: ( value: string | number) => void;
}
export default function UiSelect({
  value,
  label,
  placeholder = 'Select from the options',
  name,
  options,
  error,
  onChange,
}: Props) {
  const [optionsAreVisible, setOptionsAreVisible] = useState(false);
  const inputId = useId();
  const valueLabel = useMemo(() => {
    if (!value) return placeholder;

    return (
      options.find((option) => value === option.value)?.label || placeholder
    );
  }, [value, options, placeholder]);

  function selectOption(value: string | number) {
    onChange(value);
    setOptionsAreVisible(false);
  }

  return (
    <OutsideClickHandler onOutsideClick={() => setOptionsAreVisible(false)}>
      <div className={`${styles.select_container} ${error && styles.error}`}>
        <label htmlFor={inputId}>{label}</label>
        <div>
          <button
            className={`${optionsAreVisible && styles.optionIsVisible}`}
            type="button"
            data-testid="ui-select-trigger"
            onClick={() => setOptionsAreVisible(!optionsAreVisible)}
          >
            <div className="w-full">
              {!!valueLabel ? valueLabel : placeholder}
            </div>
            <UiIcon
              icon={optionsAreVisible ? 'CaretUp' : 'CaretDown'}
              size="24"
            />
          </button>
          {optionsAreVisible && (
            <ul data-testid="ui-select-options" className={styles.fadeIn}>
              {options.map((option, index) => (
                <li
                  onClick={() => {
                    selectOption(option.value);
                    console.log(value);
                  }}
                  key={index}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <span className={styles.error__span}>{error && `${error}`}</span>
      </div>
    </OutsideClickHandler>
  );
}
