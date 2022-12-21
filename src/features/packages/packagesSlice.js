import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import {
  getAllPackagesThunk,
  createPackageThunk,
  updatePackageThunk,
} from '../../api/packagesThunk';

const initialState = {
  isLoading: false,
  packages: [],
  totalPackages: '',
  singlePackageId: '',
  isFormFieldTouched: false,
};

export const getAllPackages = createAsyncThunk(
  'packages/getAllPackages',
  getAllPackagesThunk
);

export const createPackage = createAsyncThunk(
  'packages/createPackage',
  createPackageThunk
);

export const updatePackage = createAsyncThunk(
  'packages/updatePackage',
  updatePackageThunk
);

const packagesSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    setSinglePackageId: (state, { payload }) => {
      state.singlePackageId = payload;
    },
    setFormFieldTouched: (state, { payload }) => {
      state.isFormFieldTouched = payload;
    },
  },
  extraReducers: {
    [getAllPackages.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllPackages.fulfilled]: (state, { payload: { data, total } }) => {
      state.isLoading = false;
      state.packages = data;
      state.totalPackages = total;
    },
    [getAllPackages.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [createPackage.pending]: (state) => {
      state.isLoading = true;
    },
    [createPackage.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success('Paket uğurla yaradıldı');
    },
    [createPackage.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [updatePackage.pending]: (state) => {
      state.isLoading = true;
    },
    [updatePackage.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success('Paket uğurla yeniləndi');
    },
    [updatePackage.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { setSinglePackageId, setFormFieldTouched } =
  packagesSlice.actions;

export default packagesSlice.reducer;
