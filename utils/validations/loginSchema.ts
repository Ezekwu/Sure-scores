import * as yup from 'yup';
import { isRequiredMessage, isEmail } from './validationMessages';

export default yup.object({
  email: yup.string().email(isEmail).required(isRequiredMessage),
  password: yup.string().required(isRequiredMessage).min(8),
})