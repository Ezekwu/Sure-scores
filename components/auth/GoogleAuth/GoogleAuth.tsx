import { useLoginWithGoogleMutation } from "@/redux/features/account/accountSlice";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function GoogleAuth () {
  const [ loginWithGoogle, {isLoading} ] = useLoginWithGoogleMutation();
  const router = useRouter();

  const onAuthClicked = () => {
    loginWithGoogle(null)
    .unwrap()
    .then(()=>{
      router.push('/dashboard')
    })
    .catch((error)=>{
      toast(error.message, { type: 'error' })
    })
  }
  

  return(
    <div>
      <button onClick={onAuthClicked}>Google</button>
      <ToastContainer />
    </div>
  )
}
