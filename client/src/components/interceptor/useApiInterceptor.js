// useApiInterceptor.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiInterceptor from './apiInterceptor';
import { useDispatch } from 'react-redux';
import { loginFailure } from '../../redux/actions/authActions';

const useApiInterceptor = () => {
const history = useNavigate();
const dispatch = useDispatch();

  useEffect(() => {
    const interceptor = apiInterceptor.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
         dispatch(loginFailure())
         history('/');
        }
        return Promise.reject(error.response.data);
      }
    );

    // Clean up the interceptor on unmount
    return () => {
      apiInterceptor.interceptors.response.eject(interceptor);
    };
  },[history]);

  return apiInterceptor;
};

export default useApiInterceptor;
