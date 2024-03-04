import React, {MutableRefObject} from 'react';
import {Button, IButtonProps} from 'native-base';

interface Props extends IButtonProps {
  danger?: boolean;
  ref?: MutableRefObject<any>;
}

const CustomButton: React.FC<Props> = ({
  danger,
  variant,
  borderRadius = 'lg',
  size = 'lg',
  colorScheme = 'blue',
  ...props
}) => {
  return (
    <Button
      {...props}
      variant={variant}
      colorScheme={colorScheme}
      borderRadius={borderRadius}
      size={size}
    />
  );
};

export default CustomButton;
