// apiInterceptor.js
import axios from 'axios';

const apiInterceptor = axios.create({
  baseURL:  'http://localhost:8000'
});

// Add a request interceptor
apiInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiInterceptor.interceptors.response.use(
    (response) => {
      // You can modify the response data here before returning
      return response;
    },
    (error) => {
      // Handle response error
  
      if (error.response && error.response.status === 401) {
        // Redirect to login page if unauthorized (401)
      }
  
      return Promise.reject(error);
    }
  );

export default apiInterceptor;
