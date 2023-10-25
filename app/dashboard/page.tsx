'use client'
import { useEffect } from "react";
import {useRouter} from 'next/navigation'
import { useGetLoggedInUserQuery } from "@/redux/features/account/accountSlice";

export default function page() {
  const router = useRouter();
  //   const { isError, isLoading, isSuccess, data } = useGetLoggedInUserQuery(2)
  useEffect(()=>{
    const userId = localStorage.getItem('uid');
    if(!userId) {
      router.push('/auth/signup')
    }
  },[])
   
  return (
    <div>welcome, </div>
  )
}