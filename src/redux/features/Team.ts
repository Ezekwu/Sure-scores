import {Api} from "@/api";
import { fakeBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import CompanyMember from "@/types/CompanyMember";
import { CookieValueTypes } from "cookies-next";
import { Timestamp } from "firebase/firestore";
import { serializeField } from "@/utils/helperFunctions";
import CompanyRef from "@/types/CompanyRef";

export const teamSlice = createApi({
  baseQuery: fakeBaseQuery(),
  reducerPath: 'teamApi',
  tagTypes: ['Team'],
  endpoints: (builder) => ({
    getMembers: builder.query<CompanyMember[], CookieValueTypes>({
      queryFn: async (companyId: CookieValueTypes) => {
        try {
          const members = await Api.getMembers(companyId)
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
          const member = await Api.getMember(companyId, memberId);
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
          const newMember = await Api.addMember(member, companyId);

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
          const companyRef = await Api.getCompanyRef(companyId);
          return {data: companyRef}
        } catch (error) {
          return {error: error}        
        }
      }
    })
  }),
  
})

export const {useGetMembersQuery, useAddMemberMutation, useGetMemberQuery, useGetCompanyRefQuery } = teamSlice
