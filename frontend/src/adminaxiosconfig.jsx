import axios from 'axios';


const adminAxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/admin/'
});

adminAxiosInstance.interceptors.request.use(
    (config) => {
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken) {
            config.headers['Authorization'] = `Bearer ${adminToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);


export default adminAxiosInstance