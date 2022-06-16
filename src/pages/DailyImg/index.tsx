/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import './index.less';
import { Button } from 'antd';
import { GetBingUrl } from '@/api/bing';

function DailyImg() {
  const [urlList, setUrlList] = React.useState<any>();

  const getBing = () => {
    GetBingUrl().then((res) => {
      setUrlList(res);
    });
  };

  return (
    <div className="DailyImg">
      <h1 className="PageTitle">DailyImg</h1>
      <div className="DailyImg__wrapper">
        <h1>每日一图</h1>
        <div>golang 实现获取 每日一图，每 8 小时自动更新一次 , 跟 bing 每日一图保持一致</div>
        <h3>使用方式：</h3>
        <pre className="DailyImg__code">
          <div>
            <span className="pl-kos">&lt;</span>
            <span className="pl-ent">img</span> <span className="pl-c1">src</span>=&quot;
            <span className="pl-s">http://file.mo7.cc/api/public/bz</span>&quot; /&gt;
          </div>
          <div>
            <span className="pl-kos">&lt;</span>
            <span className="pl-ent">img</span> <span className="pl-c1">src</span>=&quot;
            <span className="pl-s">https://file.mo7.cc/api/public/bz</span>&quot; /&gt;
          </div>
          <div>
            <span className="pl-kos">&lt;</span>
            <span className="pl-ent">img</span> <span className="pl-c1">src</span>=&quot;
            <span className="pl-s">//file.mo7.cc/api/public/bz</span>&quot; /&gt;
          </div>
        </pre>
        <div>
          参数： idx=0 为随即返回一张图片,1-8则返回对应的壁纸,例如：
          <a href="https://file.mo7.cc/api/public/bz?idx=1" target="_blank">
            https://file.mo7.cc/api/public/bz?idx=1
          </a>
          固定返回当日的 cn.bing.com 壁纸
        </div>
        效果图：
        <img src="//file.mo7.cc/api/public/bz?idx=1" />
        <h3>接口请求示例: https://bz.mo7.cc/api/public/url</h3>
        <Button onClick={getBing} type="primary">
          发起 GET 请求
        </Button>
        <div className="DailyImg__code">{JSON.stringify(urlList)}</div>
      </div>
    </div>
  );
}

export default DailyImg;
