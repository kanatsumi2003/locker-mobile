import React from 'react';
import {IInputProps, Input} from 'native-base';

interface Props extends IInputProps {}

const CustomUncontrolledInput: React.FC<Props> = ({
  w = '12',
  fontSize = '14',
  size = 'xl',
  p = '2',
  ...props
}) => {
  return (
    <Input
      {...props}
      size={size}
      w={w}
      fontSize={fontSize}
      p={p}
      colorScheme="blue"
    />
  );
};

export default CustomUncontrolledInput;
