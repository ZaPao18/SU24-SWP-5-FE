import { Input } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { ErrorMessage, useField } from 'formik';
import { ReactNode } from 'react';

type Props = {
  label?: string;
  name: string;
  type?: string;
  multiple?: boolean;
  value?: string;
  placeholder?: string;
  size?: SizeType;
  prefix?: ReactNode;
  validate?: (value: any) => undefined | string | Promise<any>;
};

const InputField = ({ label, size = 'large', prefix, ...props }: Props) => {
  const [field, meta] = useField(props);
  return (
    <div style={{ width: '100%' }}>
      <label htmlFor={field.name} className='mb-2'>
        {label}
      </label>
      <Input
        {...field}
        {...props}
        status={meta.touched && meta.error ? 'error' : ''}
        autoComplete='off'
        name={field.name}
        type={props.type}
        placeholder={props.placeholder}
        size={size}
        prefix={prefix}
      />
      <ErrorMessage component='div' name={field.name} className='error' />
    </div>
  );
};

export default InputField;
