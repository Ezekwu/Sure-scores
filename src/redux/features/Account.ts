import { fakeBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import User from '@/src/types/User';
import Company from '@/src/types/Company';
import SignUpUser from '@/src/types/SignUpUser';
import {Api} from '../../api/index';
import { Toast } from '@/src/utils/toast';
import { CookieValueTypes, getCookie } from 'cookies-next'
import { setAuthToken } from '@/src/utils/cookieMthods';
import CompanyMember from '@/src/types/CompanyMember';
import CompanyRef from '@/src/types/CompanyRef';
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import db from '@/src/api/firebaseConfig';
import { serializeField } from '@/src/utils/helperFunctions';

export const accountSlice = createApi({
  baseQuery: fakeBaseQuery(),
  reducerPath: 'accountApi',
  tagTypes: ['User'],
  endpoints : (builder) => ({
    registerUser: builder.mutation({
      queryFn: async (authUser: SignUpUser) => {
        try {
          const user = await Api.createUserWithEmailAndPassword(authUser.email, authUser.password);
          const userObj: User = {
            email: authUser.email,
            id: user.uid,
            name: authUser.name,
            phone: authUser.phone,
            use_for_service: authUser.use_for_service,
            user_role: authUser.user_role,
            organizations: [''],
            birthday: authUser.birthday,
            level: authUser.level,
            gender: authUser.gender
          };

          const memberObj: CompanyMember = {
            email: authUser.email,
            id: user.uid,
            name: authUser.name,
            phone: authUser.phone,
            user_role: authUser.user_role,
            member_type: 'admin',
            level: authUser.level,
            birthday: authUser.birthday,
            gender: authUser.gender
          } 
          const companyObj: Company = {
            name: authUser.company_name,
            sector: authUser.company_field,
            id:'',
          }
          
          setAuthToken(user.uid);
          const createdCompany = await Api.createCompany(companyObj);
          await Api.createCompanyRef({
            id: createdCompany.id,
            name: createdCompany.name,
          }, createdCompany.id)
          await Api.createOrUpdateUser({...userObj, organizations: [createdCompany.id]});
          await Api.addMember(memberObj, createdCompany.id);

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
        await Api.createOrUpdateUser(user)
        return {data: null}
      },
      invalidatesTags:['User'],
    }),

    getLoggedInUser: builder.query({
      queryFn: async () => {
        try {
          const token = getCookie('auth-token')      
          if(!token) throw new Error('no token provided');

          const user = await Api.getUser(token);
          const serializedUser = serializeField(user, 'birthday');
          
          return {data: serializedUser}
          
        } catch (error) {
          return { error: {data: error as Error}};
        }
      },
      providesTags: ['User']
    }),

    loginUser: builder.mutation({
      queryFn: async (authUser: {email: string, password: string}) => {
        try {
          const user = await Api.loginUserWithEmaiAndPassword(authUser.email, authUser.password)
          setAuthToken(user.uid);
          return {data: user}
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
      },
      invalidatesTags:['User'],
    }),

    getUserCompaniesRef : builder.query<CompanyRef[], string[]>({
      queryFn: async(orgIds: string[]) => {
        try {
          const companies = await Api.getCompaniesRef(orgIds);
          return {data: companies}
        } catch (error) {
          return { error: {data: error}};
        }
      }
    }),

    getActiveCompany: builder.query<Company, CookieValueTypes>({
      queryFn: async (orgId: CookieValueTypes) => {
        try {
          if(!orgId) {
            return {data: undefined}
          }
          const activeCompany = await Api.getCompany(orgId)
          return {data: activeCompany}
        } catch (error) {
          return { error: {data: error}};
        }
      }
    }),

    addUserOrganization: builder.mutation({
      queryFn: async(orgId: string) => {
        try {
          const userId = getCookie('auth-token')
          const userDocRef = doc(db, "users", userId!);
          await updateDoc(userDocRef, {
            organizations: arrayUnion(orgId),
          });
          return {data: null}
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
  useLazyGetLoggedInUserQuery,
  useGetLoggedInUserQuery, 
  useLoginUserMutation,
  useGetUserCompaniesRefQuery,
  useGetActiveCompanyQuery,
  useAddUserOrganizationMutation
} = accountSlice;