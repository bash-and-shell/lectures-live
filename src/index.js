import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = '/api/v1'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(request => {
  return request;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  return response;
}, error => {
  console.log(error.response);
  return Promise.reject(error);
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
