import * as yup from 'yup';

export default yup.object({
  email: yup.string().email('This field requires a valid email').required('This field is required'),
  password: yup.string().required('This field is required').min(8),
})