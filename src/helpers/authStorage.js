class AuthStorage {
  setStorage = (accessToken, key = 'accessToken') => {
    window.localStorage.setItem(key, accessToken);
  };

  getStorage = (key = 'accessToken') => window.localStorage.getItem(key);

  logOut = () => {
    window.localStorage.clear();
  };

  isAuthenticated = () => !!this.getStorage();

  isValidToken = (accessToken) => {
    const expireTime = 1606275140.897;
    if (!accessToken) return false;

    const currentTime = Date.now() / 1000;
    return expireTime < currentTime;
  };
}

const authStorage = new AuthStorage();

export default authStorage;
