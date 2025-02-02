'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { useGetLoggedInUserQuery, useAddUserOrganizationMutation } from '@/redux/features/Account';
import { useDispatch } from 'react-redux';
import { useAddMemberMutation } from '@/redux/features/Team';
import {Api} from '@/api';


export default function Invite() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | null>(null);
  const authToken = getCookie('auth-token');
  const {data: user, isLoading: isUserLoading, refetch: refetchLoggedInUser} = useGetLoggedInUserQuery({});
  const [addMember,] = useAddMemberMutation();
  const [addOrganisation, {isLoading}] = useAddUserOrganizationMutation();

  useEffect(() => {
    console.log('stage init');
    if (isUserLoading) return;
    async function handleInvite() {
      if (!token) throw new Error('token not provided');

      if (!authToken) {
        router.push(`/auth/login?invite-token=${token}`);
      } else {
        const alredyInCompany = await Api.doesDocumentExist(
          `companies/${token}/members`,
          authToken,
        );
        if (!alredyInCompany && user) {
          addMember({
            member: {
              id: user.id,
              birthday: user.birthday,
              email: user.email,
              level: user.level,
              member_type: 'member',
              name: user.name,
              phone: user.phone,
              user_role: user.user_role,
              gender: user.gender,
            },
            companyId: token,
          });
          addOrganisation(token);
          setCookie('active_companyId', token, {
            maxAge: 30 * 24 * 60 * 60,
          });
          refetchLoggedInUser();
        }
        router.push('/dashboard');
      }
    }
    handleInvite();
  }, [
    token,
    authToken,
    router,
    isUserLoading,
    user,
    dispatch,
    addMember,
    addOrganisation,
    refetchLoggedInUser,
  ]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setToken(params.get('invite-token'));
    }
  }, []);
     
  return (
    <div>processing...</div>
  );
}
