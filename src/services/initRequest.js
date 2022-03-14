import axios from "axios";

// actions
import { setLoading } from "state/app/appSlice";

const configs = {
  baseURL: process.env.REACT_APP_ENDPOINT,
  // timeout: 10,
  showLoading: false,
};

export const instance = axios.create(configs);

export default function initRequest(store) {
  let requestCount = 0;

  function decreaseRequestCount() {
    requestCount -= 1;
    if (requestCount === 0) {
      store.dispatch(setLoading(false));
    }
  }

  // client request API
  instance.interceptors.request.use(
    (config) => {
      // show loading
      if (config.showLoading) {
        requestCount += 1;
        store.dispatch(setLoading(true));
      }

      // add auth token
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers["x-auth-token"] = accessToken;
      }

      return config;
    },
    (error) => {
      if (error.config.showLoading) {
        // hide loading
        decreaseRequestCount();
      }
      return Promise.reject(error);
    }
  );

  // BE response API
  instance.interceptors.response.use(
    (res) => {
      if (res.config.showLoading) {
        // hide loading
        decreaseRequestCount();
      }
      return res;
    },
    async (error) => {
      if (error && error.response.config.showLoading) {
        // hide loading
        decreaseRequestCount();
      }

      // handle request timeout
      if (error.code === "ENCONNABORTED") {
        // hide loading
        decreaseRequestCount();
        // code someting
      }

      // handle refresh token
      const statusCode = error?.reponse?.status;
      if (statusCode === 401 && error.config._retry) {
        error.config._retry = true;
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const result = await instance.post("/auth/refreshtoken", {
            refreshToken,
          });
          const accessToken = result.data;
          window.localStorage.setItem("accessToken", result.data.accessToken);
          instance.defaults.headers["x-auth-token"] = accessToken;

          // client -> call api A -> api A expries -> call api refreshToken -> call api A
          return instance(error.config);
        } catch (err) {
          if (err.response && err.response.data) {
            return Promise.reject(error.response.data);
          }
          return Promise.reject(error);
        }
      }

      // hanle errors
      switch (statusCode) {
        case 500: {
          // code something
          break;
        }
        case 403: {
          // code something
          break;
        }
        case 401: {
          // code something
          break;
        }
        default:
          break;
      }
      return Promise.reject(error);
    }
  );
}
