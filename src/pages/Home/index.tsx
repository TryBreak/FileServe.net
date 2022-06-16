import React from 'react';
import './index.less';
import Directory from '@/components/Directory';
import { StoreContext } from '@/store';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function Home() {
  const StoreData = React.useContext(StoreContext);
  const { UserInfo } = StoreData;

  return (
    <div className="Home">
      <h1 className="PageTitle">Home</h1>
      <div className="Home-wrapper">
        {UserInfo.Token && <Directory />}
        {!UserInfo.Token && (
          <div>
            <Link to="/login">
              <Button type="primary">登录</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
