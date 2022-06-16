import React from 'react';
import { message } from 'antd';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { getToken } from '@/utils/utils';

// https://juejin.cn/post/7033313711947251743

const Home = React.lazy(() => import('@/pages/Home'));

const Login = React.lazy(() => import('@/pages/Login'));

const NotFund = React.lazy(() => import('@/pages/NotFund'));
const Personal = React.lazy(() => import('@/pages/Personal'));

// About
const About = React.lazy(() => import('@/pages/About'));
const AboutList = React.lazy(() => import('@/pages/About/List'));
const AboutPwa = React.lazy(() => import('@/pages/About/PWA'));
const ReleaseNotes = React.lazy(() => import('@/pages/About/ReleaseNotes'));
const AboutOkxKey = React.lazy(() => import('@/pages/About/OkxKey'));
const AboutHunterServer = React.lazy(() => import('@/pages/About/HunterServer'));
const AboutDuty = React.lazy(() => import('@/pages/About/Duty'));

const DailyImg = React.lazy(() => import('@/pages/DailyImg'));

const logins = ['/edit_user_info', '/hunter', '/personal'];
function MyRoutes() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = getToken();

    if (!token) {
      if (logins.indexOf(pathname) > -1) {
        message.warning('需要登录');
        setTimeout(() => {
          navigate(`/login`, { replace: true });
        }, 300);
      }
    }
  }, [pathname, navigate]);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/personal" element={<Personal />} />
      <Route path="/login" element={<Login />} />
      <Route path="/daily_img" element={<DailyImg />} />

      <Route path="/about" element={<About />}>
        <Route index element={<AboutList />} />
        <Route path="/about/pwa" element={<AboutPwa />} />
        <Route path="/about/release_notes" element={<ReleaseNotes />} />
        <Route path="/about/okxkey" element={<AboutOkxKey />} />
        <Route path="/about/hunter_server" element={<AboutHunterServer />} />
        <Route path="/about/duty" element={<AboutDuty />} />
      </Route>

      <Route path="*" element={<NotFund />} />
    </Routes>
  );
}

export default MyRoutes;
