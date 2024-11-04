import api from '@/src/api';
import Project from '@/src/types/Project';
import { serializeField } from '@/src/utils/helperFunctions';
import { fakeBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

export const projectSlice = createApi({
  baseQuery: fakeBaseQuery(),
  reducerPath: 'projectApi',
  tagTypes: ['User'],
  endpoints : (builder) => ({
    getProjects: builder.query<Project[] , void>({
      queryFn: async () => {
        try {
          const projects = await api.getProjects();
          const serializedProjects = projects.map((project)=> serializeField(project, 'created_at'))
          return {data: serializedProjects}
        } catch (error) {
          return {error: error}
        }
      },
      providesTags: ['User']
    },
  ),
  getProject: builder.query<Project, string>({
    queryFn: async (projectId: string) => {
      try {
        const project = await api.getProject(projectId);
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
        const addedProject = await api.addProject(project);
        
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