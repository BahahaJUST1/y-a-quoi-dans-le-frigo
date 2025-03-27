import axios from 'axios';

const $http = axios.create({
  baseURL: process.env.REACT_APP_ENV === "master"
    ? 'https://y-a-quoi-dans-le-frigo.fr'
    : 'http://localhost:3000'
});

$http.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default $http;
