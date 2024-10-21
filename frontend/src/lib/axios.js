import axios from "axios";

const http = axios.create({
  baseURL: "https://ecommerce-backend-qxay.onrender.com/api/v1",
  // baseURL: "http://localhost:4000/api/v1", //https://ecommerce-backend-qxay.onrender.com/api/v1
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    let access_token = localStorage.getItem("access_token");
    if (access_token) {
      access_token = JSON.parse(access_token);
      config.headers["access-token"] = access_token;
    }
    let refresh_token = localStorage.getItem("refresh_token");
    if (refresh_token) {
      refresh_token = JSON.parse(refresh_token);
      config.headers["refresh-token"] = refresh_token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    // 处理响应数据
    if (response.status === 200 || response.status === 201) {
      return response.data; // 直接返回 data 部分
    } else {
      const errorMessage = response.data?.message || "请求失败";
      throw new Error(errorMessage);
    }
  },
  (error) => {
    // 处理响应错误
    return Promise.reject(error.response?.data?.message || error.message);
  }
);

// 封装 GET 方法
export const get = (url, params) => {
  return http.get(url, { params });
};

// 封装 POST 方法
export const post = (url, data) => {
  return http.post(url, data);
};

// 封装 PUT 方法
export const patch = (url, data) => {
  return http.patch(url, data);
};

// 封装 DELETE 方法
export const del = (url) => {
  return http.delete(url);
};

// 导出 Axios 实例和封装的方法
export default http;
