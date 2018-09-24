import request from '../utils/request';
// import qs from 'qs';

export function fetchData(data) {
  return request('/api/templates', { method: 'get', data });
}

export function formSubmit(data) {
  return request('/api/answer', { method: 'post', body: JSON.stringify(data) });
}
