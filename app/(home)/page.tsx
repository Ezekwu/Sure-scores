'use client'
import { useEffect } from "react";
import {useRouter} from 'next/navigation'
import { useGetLoggedInUserQuery } from "@/redux/features/Account";
import UiIcon from "@/components/ui/Icon/UiIcon";

export default function Page() {
  const router = useRouter();
  const { isError, isLoading, isSuccess, data } = useGetLoggedInUserQuery({})
  
   
  return (
    <div>
      
    </div>
  );
}