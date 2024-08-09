import * as yup from 'yup';
import { isRequiredMessage } from './validationMessages';

export default yup.object({
  name: yup.string().required(isRequiredMessage),
  use_for_service: yup.string().required(isRequiredMessage),
  user_role: yup.string().required(isRequiredMessage),
  role_level: yup.string().required(isRequiredMessage),
})