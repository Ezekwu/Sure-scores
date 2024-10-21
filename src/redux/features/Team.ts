import api from "@/src/api";
import { fakeBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import CompanyMember from "@/src/types/CompanyMember";
import { CookieValueTypes } from "cookies-next";
import { Timestamp } from "firebase/firestore";
import { serializeField } from "@/src/utils/helperFunctions";
import CompanyRef from "@/src/types/CompanyRef";

export const teamSlice = createApi({
  baseQuery: fakeBaseQuery(),
  reducerPath: 'teamApi',
  tagTypes: ['Team'],
  endpoints: (builder) => ({
    getMembers: builder.query<CompanyMember[], CookieValueTypes>({
      queryFn: async (companyId: CookieValueTypes) => {
        try {
          const members = await api.getMembers(companyId)
          const serializedMembers = members.map((member)=> {
            return serializeField(member, "birthday")
          })
          return {data: serializedMembers}
        } catch (error) {
          return { error: {data: error as Error}};
        }
      },
      providesTags: ['Team']
    }),

    getMember: builder.query({
      queryFn: async({companyId, memberId}: {companyId: CookieValueTypes, memberId: string}) => {
        try {
          const member = await api.getMember(companyId, memberId);
          const serializedMember = serializeField(member, "birthday");
          return {data: serializedMember}
        } catch (error) {
          return { error: {data: error as Error}};
        }
      }
    }),

    addMember: builder.mutation({
      queryFn: async ({ member, companyId }: { member: CompanyMember, companyId: string }) => {
        try {
          const newMember = await api.addMember(member, companyId);

          return {data: newMember}
        } catch (error) {
          return {error: error}
        }
      },
      invalidatesTags: ['Team']
    }),

    getCompanyRef: builder.query<CompanyRef, CookieValueTypes>({
      queryFn: async(companyId: CookieValueTypes) => {
        try {
          const companyRef = await api.getCompanyRef(companyId);
          return {data: companyRef}
        } catch (error) {
          return {error: error}        
        }
      }
    })
  }),
  
})

export const {useGetMembersQuery, useAddMemberMutation, useGetMemberQuery, useGetCompanyRefQuery } = teamSlice