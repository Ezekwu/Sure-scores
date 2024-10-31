import * as yup from 'yup';
import { isRequiredMessage } from './validationMessages';

export default yup.object({
  name: yup.string().required(isRequiredMessage),
  start_date: yup.string().required(isRequiredMessage),
  dead_line: yup.string().required(isRequiredMessage),
  priority: yup.string().required(isRequiredMessage),
  description: yup.string().required(isRequiredMessage),
})