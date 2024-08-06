import * as yup from 'yup';
import { isRequiredMessage } from './validationMessages';

export default yup.object({
  company_name: yup.string().required(isRequiredMessage),
  company_field: yup.string().required(isRequiredMessage),
})