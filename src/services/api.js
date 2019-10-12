import axios from 'axios';

const api = axios.create({
  baseURL: 'https://meetapp-api.diogomachado.site',
});

export default api;
