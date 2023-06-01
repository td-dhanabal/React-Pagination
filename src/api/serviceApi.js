import { API_URL } from './http'

const allUsers = () => `${API_URL}/user`;

const page = (id) => `${API_URL}/user?page=${id}`;

const size = (id) => `${API_URL}/user?size=${id}`;

const createUser = () => `${API_URL}/user`;


export default { allUsers, page, size, createUser };