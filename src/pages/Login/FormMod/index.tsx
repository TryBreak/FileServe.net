import { Modal, Form, Input, Button, message } from 'antd';
import { MailOutlined, MessageOutlined } from '@ant-design/icons';
import React from 'react';
import { resDataType } from '@/utils/utils.d';

import { verifyConfig } from '@/utils/verify';
import { ChartToStr } from '@/utils/filters';

import { setToken } from '@/utils/utils';

import { login } from '@/api/login';

import './index.less';

import { useNavigate } from 'react-router-dom';

import { StoreUpdate } from '@/store';

const FormMod = () => {
  const dispatch = React.useContext(StoreUpdate);

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formValue, setFormValue] = React.useState({
    Email: '',
    Password: '',
  });

  const [verify, setVerify] = React.useState({
    Email: {},
    Password: {},
  });

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const Elm = event.target;
    const value = Elm.value;
    const label = Elm.name;
    const valStr = value.replace(/\s*/g, '');

    setFormValue((preVal) => {
      const nowVal = {
        ...preVal,
        [label]: valStr,
      };
      return nowVal;
    });
    setVerify({
      Email: {},
      Password: {},
    });
  };

  const verifyChange = (label: string, val: string) => {
    const verify = verifyConfig(label, val);
    setVerify((preVal) => {
      const nowVal = {
        ...preVal,
        [label]: verify,
      };
      return nowVal;
    });
    return verify;
  };

  const [submitBtnStatus, setSubmitBtnStatus] = React.useState(false);
  const submitFunc = async () => {
    setSubmitBtnStatus(true);

    const v1 = verifyChange('Email', formValue.Email);
    const v2 = verifyChange('Password', formValue.Password);
    if (v1.help || v2.help) {
      setSubmitBtnStatus(false);
      return;
    }

    const res = await login({
      Email: formValue.Email,
      Password: formValue.Password,
    });
    setSubmitBtnStatus(false);
    if (res.Code > 0) {
      // 去首页
      await setToken(res.Data.Token);
      dispatch({ type: 'UserInfoUpdate' });
      message.success(res.Msg);
      navigate(`/`, { replace: true });
    }

    setFormValue((preVal) => {
      const nowVal = {
        ...preVal,
        Code: '',
        Password: '',
      };
      return nowVal;
    });
  };

  return (
    <div className="Login__formMod">
      <Form form={form} name="login" autoComplete="off">
        <Form.Item className="Login__inputG" {...verify.Email}>
          <Input.Group compact>
            <Input
              name="Email"
              autoComplete="new-password"
              onChange={inputChange}
              prefix={<MailOutlined />}
              value={formValue.Email}
              placeholder="请输入邮箱地址"
            />
          </Input.Group>
        </Form.Item>

        <Form.Item className="Login__inputG" {...verify.Password}>
          <Input.Group compact>
            <Input.Password
              name="Password"
              onChange={inputChange}
              value={formValue.Password}
              autoComplete="new-password"
              placeholder="请输入密码"
            />
          </Input.Group>
        </Form.Item>

        <Form.Item className="Login__inputG">
          <Input.Group compact>
            <Button
              disabled={submitBtnStatus}
              onClick={submitFunc}
              className="Login__submit"
              type="primary"
              htmlType="submit"
            >
              登录
            </Button>
          </Input.Group>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormMod;
