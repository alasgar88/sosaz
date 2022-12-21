import { customFetch } from '../utils/axios';
import { getAllCategories } from '../features/services/servicesSlice';

// get all categories
export const getAllCategoriesThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/admin/services/tree');
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

// create category
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

// get single category
export const getSingleCategoryThunk = async ({ id }, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/admin/services/${id}`);
    return resp.data;
  } catch (error) {
    console.log(error.response);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

// change category state
export const changeUserStatusThunk = async ({ id }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/admin/services/${id}`);
    thunkAPI.dispatch(getAllCategories());
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(getAllCategories());
      return thunkAPI.rejectWithValue(
        'Əməliyyatı icra etmək üçün səlahiyyətiniz yoxdur'
      );
    }
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};

// update category state
export const updateCategoryThunk = async (payload, thunkAPI) => {
  console.log('servisdeyem');
  console.log(payload, 'servis data');
  const { parent_id, ...rest } = payload;
  try {
    const resp = await customFetch.post(`/admin/services/${parent_id}`, rest);
    thunkAPI.dispatch(getAllCategories());
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(getAllCategories());
      return thunkAPI.rejectWithValue(
        'Əməliyyatı icra etmək üçün səlahiyyətiniz yoxdur'
      );
    }
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
};
