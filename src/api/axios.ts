import axios from 'axios';

const BASE_URL_AUTH = 'http://localhost:5000';
const BASE_URL_EMERALD = 'http://localhost:5000';

const authApi = axios.create({ baseURL: BASE_URL_AUTH });
const emeraldApi = axios.create({ baseURL: BASE_URL_EMERALD });

export { axios, authApi, emeraldApi };
