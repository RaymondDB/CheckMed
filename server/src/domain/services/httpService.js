const axios = require('axios');

class HttpService {
  static async get(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error('Error making GET request');
    }
  }

  static async post(url, data) {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      throw new Error('Error making POST request');
    }
  }
}

module.exports = HttpService;
