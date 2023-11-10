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
        .then((user)=> {

          const userObj = {
            email: authUser.email,
            id: user.uid,
            name: user.displayName!
          };

          localStorage.setItem('uid', userObj.id);
          api.createOrUpdateUserDetails(userObj);
        }).catch((error)=>{
          throw new Error(error)
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

    loginUser: builder.mutation({
      queryFn: async (authUser: {email:string, password:string}) => {
        await api.loginUserWithEmaiAndPassword(authUser.email, authUser.password)
        .then((user)=>{
          localStorage.setItem('uid', user.uid)
        })
        .catch((error)=>{
          throw new Error(error)
        })
        return {data: null}
      }
    }),

    LoginWithGoogle: builder.mutation({
      queryFn: async () => {
        await api.SignUpWithGoogle()
        // .then(async(user) => {
        //   const userId = user.uid;
        //   localStorage.setItem('uid', userId);

        //   const userObj = {
        //     email: user.email!,
        //     id: user.uid,
        //     name: user.displayName!
        //   }
        //   const existingUser = await api.getUser(userId);

        //   if(!existingUser) {
        //     await api.createOrUpdateUserDetails(userObj);
        //   }

        // })
        .catch((error) => {
          throw new Error(error)
        })
        return {data: null}
      }
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

export const { 
  useRegisterUserMutation, 
  useCreateOrUpdateUserMutation, 
  useGetLoggedInUserQuery, 
  useLoginUserMutation,
  useLoginWithGoogleMutation
} = accountSlice;