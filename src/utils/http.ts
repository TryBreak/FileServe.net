import axios from 'axios';
// import Qs from 'qs';
import { res_dispose } from './res_dispose';
import { getToken } from '@/utils/utils';
const Encrypt = window.mo7Encrypt;

import { axiosParam, resDataType } from './utils.d';

const origin = window.location.origin;

const axios_baseURL = origin;
if (origin.includes('localhost')) {
  // axios_baseURL = '//localhost:9004/';
} else if (origin.includes('xxxx')) {
  // baseUrl = '';
} else {
  // baseUrl = '';
}

const service = axios.create();
(function () {
  // 需要初始化
  service.defaults.baseURL = axios_baseURL; // 默认请求的 baseUrl
  service.defaults.timeout = 20000; // 超时 20 秒
  // 请求拦截
  service.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    },
  );

  // 响应拦截
  service.interceptors.response.use(
    (response: any) => {
      return res_dispose(response);
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    },
  );
})();

// json格式的请求
const ajax_json = (param: axiosParam): Promise<resDataType> => {
  const config: axiosParam = {
    headers: {
      Token: getToken(),
      'Auth-Encrypt': Encrypt(param.url),
    },
    ...param,
  };

  if (param.HunterNet?.HunterServerID) {
    const ServerInfo = param.HunterNet;
    delete config.HunterNet;
    config.headers['Hunter-Net-Port'] = ServerInfo.Port;
    config.headers['Hunter-Net-Host'] = ServerInfo.Host;
    config.headers['Hunter-Net-Sid'] = ServerInfo.HunterServerID;
  }

  // 请求参数转换
  if (config.method === 'get' || !config.method) {
    config.params = config.data;
    delete config.data;
  }

  return service(config) as any;
};

export { ajax_json, axios };
