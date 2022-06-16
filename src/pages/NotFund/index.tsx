import React from 'react';
import './index.less';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { Logo } from '@/config/constant';

function App() {
  return (
    <div className="NotFundApp">
      <h1 className="PageTitle">404</h1>
      <div>
        <div className="NotFundApp__logo-box">
          <img className="NotFundApp__logo" src={Logo} alt="" />
        </div>
        <h1>404 Not Found</h1>
        <Button type="primary">
          <Link to="/">返回首页</Link>
        </Button>
      </div>
    </div>
  );
}

export default App;
