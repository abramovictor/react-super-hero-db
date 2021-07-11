import axios from 'axios';
import queryString from 'query-string';

const baseURL = (process.env.NODE_ENV === 'production' ? 'https://superheroapi.com/api/' : '/');

export const httpClient = axios.create({
  baseURL: baseURL + process.env.REACT_APP_ACCESS_TOKEN,
  timeout: 10 * 1000,
  paramsSerializer: params => queryString.stringify(params, { arrayFormat: 'bracket' }),
});

