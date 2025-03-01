import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5001/api' });

export const getParts = () => api.get('/parts').then(res => res.data);
export const getCart = () => api.get('/cart').then(res => res.data);
export const getAdminData = () => api.get('/admin').then(res => res.data);
export const submitCustomKit = (data: { name: string; preferences: string }) =>
  api.post('/custom-kit', data).then(res => res.data);