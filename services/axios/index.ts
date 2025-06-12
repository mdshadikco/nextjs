import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const defaultBaseURL = "https://picsum.photos";

export const instance: AxiosInstance = axios.create({
  baseURL: defaultBaseURL,
});

instance.interceptors.request.use((config) => {
  console.log("[Request]", config);
  return config;
});

instance.interceptors.response.use(
  (response) => {
    console.log("[Response]", response);
    return response;
  },
  (error) => {
    console.error("[Error]", error);
    return Promise.reject(error);
  }
);

type RequestOptions = {
  endpoint?: string;
  url?: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: any;
  headers?: Record<string, string>;
  params?: Record<string, any>;
};

export const apicall = ({
  endpoint,
  url,
  method,
  data,
  headers,
  params,
}: RequestOptions): AxiosRequestConfig => {
  if (!url && !endpoint) {
    throw new Error("You must provide either 'url' or 'endpoint'");
  }

  return {
    url: url || endpoint,
    method,
    data,
    headers,
    params,
  };
};
