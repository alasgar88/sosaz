import { customFetch } from '../utils/axios';
import { getAllPackages } from '../features/packages/packagesSlice';
// get all categories
export const getAllPackagesThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/admin/packages');
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
export const createPackageThunk = async (data, thunkAPI) => {
  try {
    const resp = await customFetch.post('/admin/packages', data);
    thunkAPI.dispatch(getAllPackages());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const updatePackageThunk = async (packageData, thunkAPI) => {
  const { id, data } = packageData;
  console.log(id, 'id');
  try {
    const resp = await customFetch.put(`/admin/packages/${id}`, data);
    thunkAPI.dispatch(getAllPackages());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
