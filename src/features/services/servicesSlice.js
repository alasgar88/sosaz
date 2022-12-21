import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import {
  getAllCategoriesThunk,
  createCategoryThunk,
  getSingleCategoryThunk,
  changeUserStatusThunk,
  updateCategoryThunk,
} from '../../api/serviceThunk';

const initialState = {
  isLoading: false,
  categories: [],
  singleCategory: {},
  singleCategoryStatus: '',
};

export const getAllCategories = createAsyncThunk(
  'services/getAllServices',
  getAllCategoriesThunk
);

export const createCategory = createAsyncThunk(
  'services/createCategory',
  createCategoryThunk
);

export const getSingleCategory = createAsyncThunk(
  'services/getSingleCategory',
  getSingleCategoryThunk
);

export const changeCategoryStatus = createAsyncThunk(
  'services/changeCategoryStatus',
  changeUserStatusThunk
);

export const updateCategory = createAsyncThunk(
  'services/updateCategory',
  updateCategoryThunk
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setSingleCategoryStatus: (state, { payload }) => {
      state.singleCategoryStatus = payload;
    },
  },
  extraReducers: {
    [getAllCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllCategories.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.categories = payload;
    },
    [getAllCategories.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [createCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [createCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success('Kateqoriya yaradıldı');
    },
    [createCategory.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [getSingleCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleCategory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const { id, name, price } = payload;
      state.singleCategory = { key: id, value: id, title: name, price };
      state.singleCategoryStatus = payload.status;
    },
    [getSingleCategory.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [changeCategoryStatus.pending]: (state) => {
      state.isLoading = true;
    },
    [changeCategoryStatus.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success('Status dəyişdirildi');
    },
    [changeCategoryStatus.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [updateCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [updateCategory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success('Kateqoriya məlumatları yeniləndi');
    },
    [updateCategory.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { setSingleCategoryStatus } = servicesSlice.actions;

export default servicesSlice.reducer;
