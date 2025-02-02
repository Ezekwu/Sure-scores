import {Api} from '@/api';
import Project from '@/types/Project';
import { serializeField } from '@/utils/helperFunctions';
import { fakeBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { CookieValueTypes } from 'cookies-next';

export const projectSlice = createApi({
  baseQuery: fakeBaseQuery(),
  reducerPath: 'projectApi',
  tagTypes: ['User'],
  endpoints : (builder) => ({
    getProjects: builder.query<Project[] , CookieValueTypes>({
      queryFn: async (companyId: CookieValueTypes) => {
        try {
          const projects = await Api.getProjects(companyId);
          
          const serializedProjects = projects.map((project)=> serializeField(project, 'created_at'))
          
          return {data: serializedProjects}
        } catch (error) {
          return {error: error}
        }
      },
      providesTags: ['User']
    },
  ),
  getProject: builder.query<Project, { companyId: CookieValueTypes, projectId: string }>({
    queryFn: async ({companyId, projectId}) => {
      try {
        const project = await Api.getProject(companyId, projectId);
        const serializedProject = serializeField(project, 'created_at')
        return {data: serializedProject}
      } catch (error) {
        return {error: error}
      }
    },
  }),

  addProject: builder.mutation({
    queryFn: async (project: Project) => {
      try {
        console.log(project, 'got in here');
        
        const addedProject = await Api.addProject(project);

        console.log(addedProject, 'this is the added project');
        
        
        return {data: addedProject}
      } catch (error) {
        return {error: error}
      }
    },
    invalidatesTags: ['User']
  })
  })
});

export const {useAddProjectMutation, useGetProjectsQuery, useGetProjectQuery} = projectSlice
