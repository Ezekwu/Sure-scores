import { fakeBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import User from '@/types/User';
import Company from '@/types/Company';
import SignUpUser from '@/types/SignUpUser';
import api from '../../api/index';
import { Toast } from '@/utils/toast';
import { getCookie} from 'cookies-next'
import { setAuthToken } from '@/utils/cookieMthods';
import CompanyMember from '@/types/CompanyMember';

export const accountSlice = createApi({
  baseQuery: fakeBaseQuery(),
  reducerPath: 'accountApi',
  tagTypes: ['User'],
  endpoints : (builder) => ({
    registerUser: builder.mutation({
      queryFn: async (authUser: SignUpUser) => {
        try {
          const user = await api.createUserWithEmailAndPassword(authUser.email, authUser.password);
          const userObj: User = {
            email: authUser.email,
            id: user.uid,
            name: authUser.name,
            phone: authUser.phone,
            use_for_service: authUser.use_for_service,
            user_role: authUser.user_role,
            organizations: ['']
          };

          const memberObj: CompanyMember = {
            email: authUser.email,
            id: user.uid,
            name: authUser.name,
            phone: authUser.phone,
            user_role: authUser.user_role,
            member_type: 'admin'
          } 

          const companyObj: Company = {
            name: authUser.company_name,
            sector: authUser.company_field,
            id:'',
          }
          
          setAuthToken(user.uid);
          const createdCompany = await api.createCompany(companyObj);
          await api.createOrUpdateUserDetails({...userObj, organizations: [createdCompany.id]});
          await api.addMember(memberObj, createdCompany.id);

          return { data: null };
        } catch (err) {
          let msg: string = (err as { message: string }).message;
          if (msg === 'Firebase: Error (auth/email-already-in-use).') {
            msg = 'A user with this email already exists';
          } else if(msg === 'Firebase: Error (auth/network-request-failed).'){
            msg = 'Network error, please try again'
          }
            
          Toast.error({msg: `${msg}`})
          return { error: { status: 'CUSTOM_ERROR', data: msg } };
        }
      },
      invalidatesTags: ['User'],
    }),

    createOrUpdateUser: builder.mutation({
      queryFn: async (user: User) => {
        await api.createOrUpdateUserDetails(user)
        return {data: null}
      },
      invalidatesTags:['User'],
    }),

    loginUser: builder.mutation({
      queryFn: async (authUser: {email: string, password: string}) => {
        try {
          const user = await api.loginUserWithEmaiAndPassword(authUser.email, authUser.password)
          setAuthToken(user.uid)
        } catch (error) {
          let msg: string = (error as { message: string }).message;
          if(msg === 'Firebase: Error (auth/user-not-found).'){
            msg = 'User does not exist'
          } else if(msg === 'Firebase: Error (auth/wrong-password).'){
            msg = 'Incorrect password'
          }
          Toast.error({msg})
          return { error: { status: 'CUSTOM_ERROR', data: msg } };
        }
        return {data: null}
      }
    }),

    getLoggedInUser: builder.query({
      queryFn: async () => {
        const token = getCookie('auth-token')
        let user
        if(token){
          user = await api.getUser(token)
        }
        return {data: user}
      },
    }),
    
    getUserCompanies : builder.query<Company[], string[]>({
      queryFn: async(orgIds: string[]) => {
        try {
          const companies = await api.getCompanies(orgIds)
          return {data: companies}
        } catch (error) {
          return { error: {data: error}};
        }
      }
    })
  }), 



})

export const { 
  useRegisterUserMutation, 
  useCreateOrUpdateUserMutation, 
  useGetLoggedInUserQuery, 
  useLoginUserMutation,
  useGetUserCompaniesQuery,
} = accountSlice;