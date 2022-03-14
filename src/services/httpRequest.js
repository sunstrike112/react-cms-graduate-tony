
import { instance } from './initRequest';

class HttpRequest {
  async get(url, options = {}) {
    return instance.get(url, options);
  }

  async post(url, data, options = {}) {
    return instance.post(url, data, options);
  }

  async delete(url, options = {}) {
    return instance.delete(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

const httpRequest = new HttpRequest();

export default httpRequest;