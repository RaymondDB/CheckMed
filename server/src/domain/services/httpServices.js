const axios = require("axios");

class HttpService {
  async get(url, headers = {}) {
    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error(`Error en GET ${url}:`, error.message);
      throw error;
    }
  }

  async post(url, data, headers = {}) {
    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      console.error(`Error en POST ${url}:`, error.message);
      throw error;
    }
  }

  async put(url, data, headers = {}) {
    try {
      const response = await axios.put(url, data, { headers });
      return response.data;
    } catch (error) {
      console.error(`Error en PUT ${url}:`, error.message);
      throw error;
    }
  }

  async delete(url, headers = {}) {
    try {
      const response = await axios.delete(url, { headers });
      return response.data;
    } catch (error) {
      console.error(`Error en DELETE ${url}:`, error.message);
      throw error;
    }
  }
}

module.exports = new HttpService();