import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Template } from '../../types';
import { subscribeToTemplates } from '../../services/templateService';

interface TemplateState {
  templates: Template[];
  currentTemplate: Template | null;
  loading: boolean;
  error: string | null;
}

const initialState: TemplateState = {
  templates: [],
  currentTemplate: null,
  loading: false,
  error: null,
};

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setTemplates: (state, action: PayloadAction<Template[]>) => {
      state.templates = action.payload;
    },
    setCurrentTemplate: (state, action: PayloadAction<Template | null>) => {
      state.currentTemplate = action.payload;
    },
    addTemplate: (state, action: PayloadAction<Template>) => {
      state.templates.push(action.payload);
    },
    updateTemplate: (state, action: PayloadAction<Template>) => {
      const index = state.templates.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.templates[index] = action.payload;
      }
    },
    removeTemplate: (state, action: PayloadAction<string>) => {
      state.templates = state.templates.filter(t => t.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    realtimeUpdateTemplates: (state, action: PayloadAction<Template[]>) => {
      state.templates = action.payload;
    },
  },
});

export const { setTemplates, setCurrentTemplate, addTemplate, updateTemplate, removeTemplate, setLoading, setError, realtimeUpdateTemplates } = templateSlice.actions;
export default templateSlice.reducer;

export const subscribeToTemplatesThunk = createAsyncThunk(
  'template/subscribeToTemplates',
  async (_, { dispatch }) => {
    subscribeToTemplates((templates) => {
      dispatch(realtimeUpdateTemplates(templates));
    });
  },
);
