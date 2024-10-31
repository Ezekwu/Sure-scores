import styles from './insertLink.module.scss';
import UiModal from '../ui/Modal/UiModal';
import UiForm from '../ui/Form/UiForm';
import UiInput from '../ui/Input/UiInput';
import UiButton from '../ui/Button/UiButton';
import UiIcon from '../ui/Icon/UiIcon';
import Link from '@/src/types/Link';

interface Props {
  onClose: () => void;
  isOpen: boolean;
  handleSetLinks: (link: Link) => void;
}

export default function InsertLink({ isOpen, onClose, handleSetLinks }:Props) {

  function onSubmit(data: Link) {
    handleSetLinks(data);
    onClose()
  }

  return (
    <div className={styles.insertLink}>
      <UiModal closeModal={onClose} isOpen={isOpen} title="Insert Link">
        <UiForm onSubmit={onSubmit} >
          {({ errors, register, control }) => (
            <div className={styles.insertLink_form}>
              <UiInput
                name="text"
                register={register}
                control={control}
                label="Display text"
                placeholder="enter text"
              />
              <UiInput
                name="url"
                register={register}
                control={control}
                label="Url"
                placeholder="enter url"
              />
              <UiButton>
                Insert Link
                <UiIcon icon="Link" />
              </UiButton>
            </div>
          )}
        </UiForm>
      </UiModal>
    </div>
  );
}