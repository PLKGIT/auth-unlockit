import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "https://auth-unlockit.herokuapp.com";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + '/api/auth/all');
  }

  getUserBoard() {
    return axios.get(API_URL + '/api/auth/user', { headers: authHeader() });
  }

  getTeacherBoard() {
    return axios.get(API_URL + '/api/auth/teacher', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + '/api/auth/admin', { headers: authHeader() });
  }
}

export default new UserService();