import { fakeBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import User from '@/types/User';
import SignUpUser from '@/types/SignUpUser';
import api from '../../api/index';

const fireStoreApi = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints : (builder) => ({
    RegisterUser: builder.mutation({
       queryFn: async (AuthUser: SignUpUser) => {
        const u = api.createUserWithEmailAndPassword(AuthUser.email, AuthUser.password)
        .then((userCredentials)=> {
          
        })
        return {data: null}
      }
    }),
    CreateOrUpdateUser: builder.mutation({
      queryFn: async () => {

        return {data: null}
      }
    })
  })
})