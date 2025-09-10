import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Project } from '../../types';
import { subscribeToProjects } from '../../services/projectService';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    setCurrentProject: (state, action: PayloadAction<Project | null>) => {
      state.currentProject = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    realtimeUpdateProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
  },
});

export const { setProjects, setCurrentProject, addProject, updateProject, removeProject, setLoading, setError, realtimeUpdateProjects } = projectSlice.actions;
export default projectSlice.reducer;


export const subscribeToProjectsThunk = createAsyncThunk(
  'project/subscribeToProjects',
  async (_, { dispatch }) => {
    subscribeToProjects((projects) => {
      dispatch(realtimeUpdateProjects(projects));
    });
  },
);