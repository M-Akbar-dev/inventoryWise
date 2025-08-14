import Axios from 'axios';
import { normalizeApiError } from '../ApiErrorHandler';

// const baseURL = 'https://api.physicianmarketing.us';
// const baseURL = 'https://stg-api.physicianmarketing.us';
const baseURL = 'http://192.168.0.117:3001';





const axiosInstance = Axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);



export const apiPost = async (url, data, authToken, refreshToken) => {
  try {
    const headers = {
      Authorization: authToken ? `Bearer ${authToken}` : undefined,
      "Refresh-Token": refreshToken ? `Bearer ${refreshToken}` : undefined,
    };

    const response = await axiosInstance.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error("API Post Error:", error);
    throw normalizeApiError(error);
  }
};

export const apiGet = async (url, authToken, refreshToken) => {
  try {
    const headers = {
      Authorization: authToken ? `Bearer ${authToken}` : undefined,
      "Refresh-Token": refreshToken ? `Bearer ${refreshToken}` : undefined,
    };
    const response = await axiosInstance.get(url, { headers });
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};


export const apiGetWithParams = async (url, params, authToken, refreshToken) => {
  try {
    const headers = {
      Authorization: authToken ? `Bearer ${authToken}` : undefined,
      "Refresh-Token": refreshToken ? `Bearer ${refreshToken}` : undefined,
    };
    const response = await axiosInstance.get(url, { params, headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const apiPostWithoutPayload = async (url, authToken, refreshToken) => {
  try {
    const headers = {
      Authorization: authToken ? `Bearer ${authToken}` : undefined,
      "Refresh-Token": refreshToken ? `Bearer ${refreshToken}` : undefined,
    };
    const response = await axiosInstance.post(url, {}, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiPut = async (url, data, authToken, refreshToken) => {
  try {
    const headers = {
      Authorization: authToken ? `Bearer ${authToken}` : undefined,
      "Refresh-Token": refreshToken ? `Bearer ${refreshToken}` : undefined,
    };

    const response = await axiosInstance.put(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error("API Put Error:", error);
    throw normalizeApiError(error);
  }
};



export const apiPostwithOutToken = async (url, data) => {
  console.log(data, "API Payload");
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await axiosInstance.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error("API Post Error:", error.response?.data || error.message);
    throw error.response?.data?.message || "Something went wrong!";
  }
};

export const apiPatch = async (url, data, authToken, refreshToken) => {
  try {
    const headers = {
      Authorization: authToken ? `Bearer ${authToken}` : undefined,
      "Refresh-Token": refreshToken ? `Bearer ${refreshToken}` : undefined,
    };
    const response = await axiosInstance.patch(url, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiDelete = async (url, data, authToken, refreshToken) => {
  try {
    const headers = {
      Authorization: authToken ? `Bearer ${authToken}` : undefined,
      "Refresh-Token": refreshToken ? `Bearer ${refreshToken}` : undefined,
    };
    console.log(headers, "ASD?AD?FS?D?")
    const response = await axiosInstance.delete(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error("API Delete Error:", error.response?.data || error.message);
    throw error;
  }
}


export default axiosInstance; 
