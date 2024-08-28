
import Image from 'next/image';
import UiModal from '../ui/Modal/UiModal';
import UiInput from '../ui/Input/UiInput';
import UiForm from '../ui/Form/UiForm';
import AddMemberImg from '@/public/assets/images/add-member.png';
import styles from './addmember.module.scss';
import UiButton from '../ui/Button/UiButton';
import AddmemberSchema from '@/src/utils/validations/AddmemberSchema';
import useToggle from '@/src/utils/hooks/useToggle';
import { Toast } from '@/src/utils/toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddMember({ isOpen, onClose }: Props) {
  const loading = useToggle();
  async function OnSubmit(formData: { email: string }) {
    try {
      loading.on()
      const response =  await fetch('/api/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        inviteEmail: formData.email,
        senderCompany: 'Codexx',
        senderName: 'Jeremiah',
        companyId: ''
      }),
    });

      if(!response.ok){
        Toast.error({msg:'error  invite'})
      } else {
        Toast.success({ msg: 'invite sucessfully sent' });
      }
    } catch (error) {
      Toast.error({msg: 'error sending invite '})
    } finally {
      loading.off()
    }

  }

  return (
    <UiModal closeModal={onClose} isOpen={isOpen} title="Add Member">
      <div className={styles.addMember}>
        <Image src={AddMemberImg} alt="" />
        <UiForm onSubmit={OnSubmit} schema={AddmemberSchema}>
          {({ errors, register }) => (
            <div>
              <UiInput
                register={register}
                error={errors?.email?.message}
                name="email"
                label="Member’s Email"
                placeholder="enter member’s email"
                type="text"
              />
              <UiButton loading={loading.value}>Invite</UiButton>
            </div>
          )}
        </UiForm>
      </div>
    </UiModal>
  );
}
