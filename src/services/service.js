import axios from 'axios';

class Service {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json'
      }
    });
  }

  async get(id = '') {
    const endpoint = (id != '') ? `${this.endpoint}/${id}` : this.endpoint

    try {
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      if (!error.response)
        throw error

      const { data, status } = error.response
      throw { data, status }
    }
  }

  async post(data) {
    try {
      const response = await this.api.post(this.endpoint, data);
      return response.data;
    } catch (error) {
      if (!error.response)
        throw error

      const { data, status } = error.response
      throw { data, status }
    }
  }

  async put(id, data) {
    try {
      const response = await this.api.put(`${this.endpoint}/${id}`, data);
      return response.data;
    } catch (error) {
      if (!error.response)
        throw error

      const { data, status } = error.response
      throw { data, status }
    }
  }

  async delete(id) {
    try {
      await this.api.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      if (!error.response)
        throw error

      const { data, status } = error.response
      throw { data, status }
    }
  }
}

export default Service;
