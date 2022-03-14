import httpRequest from "./httpRequest"

export const loginUser = async (bodyData) => {
  return httpRequest.post('/api/user/login', bodyData, {
    showLoading: true
  });
}

export const authenticateUser = async () => {
  return httpRequest.post('/api/auth');
}