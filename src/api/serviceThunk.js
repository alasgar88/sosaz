import { customFetch } from '../utils/axios';
import { getAllCategories } from '../features/services/servicesSlice';

export const getAllCategoriesThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/admin/services/tree');
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const createCategoryThunk = async (category, thunkAPI) => {
  try {
    const resp = await customFetch.post('/admin/services', category);
    thunkAPI.dispatch(getAllCategories());
    // comment
    return resp.data;
  } catch (error) {
    console.log(error.response);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

export const getSingleCategoryThunk = async ({ id }, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/admin/services/${id}`);
    return resp.data;
  } catch (error) {
    console.log(error.response);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
