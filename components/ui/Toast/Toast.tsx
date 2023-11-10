import { toast } from 'react-toastify';

const Toast = {
  success: (msg: string) => toast.success(msg, {className:'toastify-success',})
}

export default Toast