import './index.less';
import { ChartToStr } from '@/utils/filters';
import React from 'react';
import { Logo } from '@/config/constant';

const FormMod = React.lazy(() => import('./FormMod'));

function Login() {
  return (
    <div className="Login">
      <h1 className="PageTitle">Login</h1>
      <div className="Login__logo-box">
        <img className="Login__logo" src={Logo} alt="" />
      </div>
      <h1 className="Login__title">
        <div>登录</div>
      </h1>
      <FormMod />
    </div>
  );
}

export default Login;
