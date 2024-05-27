import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastActions = {
  success(
    message?: string,
    position?:
      | 'top-right'
      | 'top-center'
      | 'top-left'
      | 'bottom-right'
      | 'bottom-center'
      | 'bottom-left',
  ) {
    toast.success(message ? message : 'Success', {
      position: position ? position : 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  },
  error(message?: string, position?: string) {
    toast.error(message ? message : 'Error:', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  },
};

export default function useToast() {
  function setOffToast(
    status: 'success' | 'error',
    message?: string,
    position?:
      | 'top-right'
      | 'top-center'
      | 'top-left'
      | 'bottom-right'
      | 'bottom-center'
      | 'bottom-left',
  ) {
    toastActions[status](message, position);
  }
  // To Show Toast use the expression below
  // setOffToast('success', 'Successfully Updated Details');
  // setOffToast('error', 'Error: Something went wrong');

  return { setOffToast };
}
