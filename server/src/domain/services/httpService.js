import axios from 'axios';
import { config } from '../../infrastructure/db/dbconfig';

class HttpService {
  constructor() {
    this.client = axios.create({
      baseURL: config.apiUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Interceptor para manejo de tokens
    this.client.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );
    
    // Interceptor para manejo de respuestas
    this.client.interceptors.response.use(
      response => response,
      error => {
        // Centralizar manejo de errores comunes
        if (error.response && error.response.status === 401) {
          // Manejar expiración de token
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async get(url, params = {}) {
    try {
      const response = await this.client.get(url, { params });
      return response;
    } catch (error) {
      this._handleError(error);
      throw error;
    }
  }

  async post(url, data = {}, config = {}) {
    try {
      const response = await this.client.post(url, data, config);
      return response;
    } catch (error) {
      this._handleError(error);
      throw error;
    }
  }

  async put(url, data = {}) {
    try {
      const response = await this.client.put(url, data);
      return response;
    } catch (error) {
      this._handleError(error);
      throw error;
    }
  }

  async delete(url) {
    try {
      const response = await this.client.delete(url);
      return response;
    } catch (error) {
      this._handleError(error);
      throw error;
    }
  }

  _handleError(error) {
    console.error('HTTP Service Error:', error);
    // Aquí podríamos implementar logging centralizado
  }
}

export default HttpService;