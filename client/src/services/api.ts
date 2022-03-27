import { axiosConfig } from './axiosConfig';

export const createOne = async (
  endpoint: any,
  payload: any,
  successCallback: any,
  errorCallback: any,
  doSomething: any
) => {
  try {
    const res = await axiosConfig.post(endpoint, payload);
    if (res.statusText !== 'OK') {
      throw new Error('Request failed!'); // bad request!
    }
    successCallback(res.data);
  } catch (error: any) {
    if ((error.name = 'AbortError')) {
      console.log('Fetch is cancelled!');
    }
    errorCallback(error.message);
  } finally {
    doSomething();
  }
};

export const readAll = async (
  endpoint: any,
  successCallback: any,
  errorCallback: any,
  doSomething: any
) => {
  try {
    const res = await axiosConfig.get(endpoint);
    if (res.statusText !== 'OK') {
      throw new Error('Request failed!'); // bad request!
    }
    successCallback(res.data);
  } catch (error: any) {
    if ((error.name = 'AbortError')) {
      console.log('Fetch is cancelled!');
    }
    errorCallback(error.message);
  } finally {
    doSomething();
  }
};

export const updateOne = async (
  endpoint: any,
  id: any,
  payload: any,
  successCallback: any,
  errorCallback: any,
  doSomething: any
) => {
  try {
    const res = await axiosConfig.put(endpoint + id, payload);
    if (res.statusText !== 'OK') {
      throw new Error('Request failed!'); // bad request!
    }
    successCallback(res.data);
  } catch (error: any) {
    if ((error.name = 'AbortError')) {
      console.log('Fetch is cancelled!');
    }
    errorCallback(error.message);
  } finally {
    doSomething();
  }
};

export const deleteOne = async (
  endpoint: any,
  id: any,
  successCallback: any,
  errorCallback: any,
  doSomething: any
) => {
  try {
    const res = await axiosConfig.delete(endpoint + id);
    if (res.statusText !== 'OK') {
      throw new Error('Request failed!'); // bad request!
    }
    successCallback(res.data);
  } catch (error: any) {
    if ((error.name = 'AbortError')) {
      console.log('Fetch is cancelled!');
    }
    errorCallback(error.message);
  } finally {
    doSomething();
  }
};
