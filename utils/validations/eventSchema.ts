import * as yup from 'yup';
import { isRequiredMessage } from './validationMessages';
import { title } from 'process';
export default yup.object({
  title: yup.string().required(isRequiredMessage),
  category: yup.string().required(isRequiredMessage),
  priority: yup.string().required(isRequiredMessage),
  date: yup.date().required(isRequiredMessage),
  start_time: yup.string().required(isRequiredMessage),
  end_time:  yup.string().required(isRequiredMessage),
})