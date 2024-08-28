'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { useGetLoggedInUserQuery, useAddUserOrganizationMutation } from '@/src/redux/features/Account';
import { useAddMemberMutation } from '@/src/redux/features/Team';
import api from '@/src/api';


export default function Invite() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const authToken = getCookie('auth-token');
  const {data: user, isLoading: isUserLoading} = useGetLoggedInUserQuery({});
  const [addMember,] = useAddMemberMutation();
  const [addOrganisation, {isLoading}] = useAddUserOrganizationMutation();


  useEffect(() => {
    if (isUserLoading) return;
    async function handleInvite() {
      if (!token) throw new Error('token not provided');

      if (!authToken) {
        router.push(`/auth/login?invite-token=${token}`);
      } else {
        const alredyInCompany = await api.doesDocumentExist(
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
              gender: user.gender
            },
            companyId: token,
          });
          addOrganisation(token);
          setCookie('active_companyId', token, {
            maxAge: 30 * 24 * 60 * 60,
          });
        }
        router.push('/team');
      }
    }
    handleInvite();
  }, [token, authToken, router, isUserLoading, user, addMember, addOrganisation]);
   
  
  return <div>processing...</div>;
}