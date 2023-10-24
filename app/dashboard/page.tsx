import { useEffect } from "react";
export default function page() {

  useEffect(()=>{
    const userId = localStorage.getItem('uid');

  },[])

  return (
    <div>welcome, </div>
  )
}