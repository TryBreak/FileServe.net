import { Logo as logoPath } from '@/config/constant';

function Logo(props: { [key: string]: any }) {
  let imgSrc = logoPath;
  if (props.url) {
    imgSrc = props.url;
  }

  return <img {...props} src={imgSrc} alt="" />;
}

export default Logo;
