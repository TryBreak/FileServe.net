import { getToken } from '@/utils/utils';
const Encrypt = window.mo7Encrypt;

export const uploadParam = {
  action: '/private/upload_file',
  headers: {
    'Auth-Token': getToken(),
    'Auth-Encrypt': Encrypt('/private/upload_file'),
  },
};
