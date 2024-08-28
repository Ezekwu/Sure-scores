import api from "@/src/api";
import { fakeBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import CompanyMember from "@/src/types/CompanyMember";
import { CookieValueTypes } from "cookies-next";

export const teamSlice = createApi({
  baseQuery: fakeBaseQuery(),
  reducerPath: 'teamApi',
  tagTypes: ['Team'],
  endpoints: (builder) => ({
    getMembers: builder.query<CompanyMember[], CookieValueTypes>({
      queryFn: async (companyId: CookieValueTypes) => {
        try {
          const members = await api.getMembers(companyId)
          return {data: members}
        } catch (error) {
          return { error: {data: error as Error}};
        }
      },
      providesTags: ['Team']
    }),
    addMember: builder.mutation({
      queryFn: async ({ member, companyId }: { member: CompanyMember, companyId: string }) => {
        try {
          const newMember = await api.addMember(member, companyId)
          return {data: newMember}
        } catch (error) {
          return {error: error}
        }
      }
    })
  })
})

export const {useGetMembersQuery, useAddMemberMutation, useLazyGetMembersQuery } = teamSlice