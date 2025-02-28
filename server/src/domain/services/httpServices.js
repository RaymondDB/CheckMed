const axios = require("axios");

class HttpService {
  async get(url, headers = {}) {
    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      this.handleError("GET", url, error);
    }
  }

  async post(url, data, headers = {}) {
    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      this.handleError("POST", url, error);
    }
  }

  async put(url, data, headers = {}) {
    try {
      const response = await axios.put(url, data, { headers });
      return response.data;
    } catch (error) {
      this.handleError("PUT", url, error);
    }
  }

  async delete(url, headers = {}) {
    try {
      const response = await axios.delete(url, { headers });
      return response.data;
    } catch (error) {
      this.handleError("DELETE", url, error);
    }
  }

  handleError(method, url, error) {
    console.error(`❌ Error en ${method} ${url}:`, error.message);
    throw error;
  }
}

module.exports = new HttpService();
