import { fakeBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import User from '@/types/User';
import SignUpUser from '@/types/SignUpUser';
import api from '../../../api/index';

export const accountSlice = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['User'],
  endpoints : (builder) => ({

    registerUser: builder.mutation({
       queryFn: async (authUser: SignUpUser) => {
         api.createUserWithEmailAndPassword(authUser.email, authUser.password)
          .then((userCredentials)=> {
            const itemToRemove = [authUser.cPassword, authUser.password]
            const userObj =  Object.fromEntries(
              Object.entries(authUser).filter(([key]) => !itemToRemove.includes(key))
            );

            userObj.id = userCredentials.uid;
            localStorage.setItem('uid', userObj.uid);

          })
        return {data: null}
      }
    }),

    createOrUpdateUser: builder.mutation({
      queryFn: async (user: User) => {
        api.createOrUpdateUserDetails(user)
        return {data: null}
      },
      invalidatesTags:['User'],
    }),
    
  }),
  
})

export const { useRegisterUserMutation, useCreateOrUpdateUserMutation } = accountSlice;