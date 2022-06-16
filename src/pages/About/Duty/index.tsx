import React from 'react';
const BackPage = React.lazy(() => import('@/components/BackPage'));

import { StoreContext, StoreUpdate } from '@/store';

function AboutDuty() {
  const StoreData = React.useContext(StoreContext);
  const dispatch = React.useContext(StoreUpdate);

  return (
    <div className="AboutDuty">
      <BackPage>Back</BackPage>
      <h3> 用户协议与免责声明 </h3>
    </div>
  );
}

export default AboutDuty;
