import * as yup from 'yup';

export default yup.object({
  time: yup.string().required('This field is required')
})