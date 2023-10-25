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
        await api.createUserWithEmailAndPassword(authUser.email, authUser.password)
          .then((userCredentials)=> {
            const userObj = {
              email: authUser.email,
              id: userCredentials.uid
            }
            localStorage.setItem('uid', userObj.id);
            api.createOrUpdateUserDetails(userObj)

          }).catch((error)=>{
            console.log(error);
          })
        return {data: null}
      },
      invalidatesTags:['User'],
    }),

    createOrUpdateUser: builder.mutation({
      queryFn: async (user: User) => {
        await api.createOrUpdateUserDetails(user)
        return {data: null}
      },
      invalidatesTags:['User'],
    }),

    getLoggedInUser: builder.query({
      queryFn: async () => {
        const userId = localStorage.getItem('uid')
        let user
        if(userId){
          user = api.getUser(userId)
        }
        return {data: user}
      },
    })
  }), 
  

})

export const { useRegisterUserMutation, useCreateOrUpdateUserMutation, useGetLoggedInUserQuery } = accountSlice;