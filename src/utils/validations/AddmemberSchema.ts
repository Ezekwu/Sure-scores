import * as yup from 'yup';
import { isEmail, isRequiredMessage } from './validationMessages';
export default yup.object({
  email: yup.string().email(isEmail).required(isRequiredMessage),
})