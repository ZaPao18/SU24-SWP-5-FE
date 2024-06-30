import { Button } from 'antd';
import { ButtonHTMLType, ButtonProps, ButtonType } from 'antd/es/button';
import { SizeType } from 'antd/es/config-provider/SizeContext';

type Props = {
  content: string;
  width?: string;
  onClick?: () => void;
} & ButtonProps;

const DiamondButton = ({ content, width, type = 'primary', onClick, ...props }: Props) => {
  return (
    <Button {...props} style={{ width }} type={type} onClick={onClick}>
      {content}
    </Button>
  );
};

export default DiamondButton;
