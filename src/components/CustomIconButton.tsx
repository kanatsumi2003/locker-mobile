import {IIconButtonProps, Icon, IconButton} from 'native-base';
import React from 'react';

interface Props extends IIconButtonProps {
  icon: React.JSX.Element;
}

const CustomIconButton: React.FC<Props> = ({
  icon,
  colorScheme = 'blue',
  ...props
}) => {
  return (
    <IconButton
      {...props}
      colorScheme={colorScheme}
      icon={<Icon as={icon} />}
    />
  );
};

export default CustomIconButton;
