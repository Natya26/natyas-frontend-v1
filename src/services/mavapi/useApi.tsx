import { useCallback, useState } from 'react';
import { ApiError, OpenAPI } from '../openapi';
import Cookies from 'js-cookie';
import { SERVER_BASE_URL } from 'utils/constants';

export function useApi() {
  const [error, setError] = useState<ApiError | unknown>(undefined);
  const [isLoading, setIsloading] = useState<boolean>(true);

  OpenAPI.BASE = SERVER_BASE_URL;

  OpenAPI.HEADERS = {
    Authorization: `Bearer ${Cookies.get('accessToken')}`,
    ID: `${Cookies.get('idToken')}`,
  };
  const handleRequest = useCallback(async function <T>(request: Promise<T>) {
    setIsloading(true);
    try {
      const response = await request
        .then(res => {
          return res;
        })
        .catch(err => {
          return err;
        });
      setError(undefined);
      return response;
    } catch (error) {
      setError(error);
    } finally {
      setIsloading(true);
    }
  }, []);

  function dismissError() {
    setError(undefined);
  }

  return { dismissError, error, isLoading, handleRequest };
}

export default useApi;
