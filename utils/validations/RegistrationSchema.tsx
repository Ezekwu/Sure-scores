import * as yup from 'yup';
import { isRequiredMessage, isEmail } from './validationMessages';

export default yup.object({
  email: yup.string().email(isEmail).required(isRequiredMessage),
  password: yup.string().required(isRequiredMessage).min(8),
  phone: yup.string().matches(
      /^(\+\d{1,3}[- ]?)?\d{10}$/,
      'Phone number is not valid'
    ).required(isRequiredMessage),
});
