import { Button } from 'antd';
import { ButtonHTMLType, ButtonType } from 'antd/es/button';
import { SizeType } from 'antd/es/config-provider/SizeContext';

type Props = {
  content: string;
  width?: string;
  size?: SizeType;
  type?: ButtonType;
  htmlType?: ButtonHTMLType;
  className?: string;
  onClick?: () => void;
};

const DiamondButton = ({
  content,
  width,
  size,
  type = 'primary',
  htmlType,
  className,
  onClick,
}: Props) => {
  return (
    <Button
      style={{ width }}
      size={size}
      type={type}
      htmlType={htmlType}
      className={className}
      onClick={onClick}
    >
      {content}
    </Button>
  );
};

export default DiamondButton;
