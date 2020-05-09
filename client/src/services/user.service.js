import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "https://auth-unlockit.herokuapp.com";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + '/api/test/all');
  }

  getUserBoard() {
    return axios.get(API_URL + '/api/test/user', { headers: authHeader() });
  }

  getTeacherBoard() {
    return axios.get(API_URL + '/api/test/teacher', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + '/api/test/admin', { headers: authHeader() });
  }
}

export default new UserService();