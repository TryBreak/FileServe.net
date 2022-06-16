import { ajax_json } from '@/utils/http';
import { removeToken } from '@/utils/utils';
const Encrypt = window.mo7Encrypt;
const Md5 = window.Md5;

interface loginData {
  Email: string;
  Password: string;
}
export const login = (data: loginData) => {
  const param = {
    ...data,
    Password: Md5(data.Password),
  };

  return ajax_json({
    url: '/api/public/login',
    data: param,
    method: 'post',
  });
};

export const outLogin = () => {
  removeToken();
  window.location.replace('/login');
};

// 用户信息的获取与编辑
export const getUserInfo = () => {
  return ajax_json({
    url: '/api/private/get_user_info',
    data: {},
    method: 'get',
  });
};
