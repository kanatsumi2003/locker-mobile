import React from 'react';
import {Badge, IBadgeProps, Text} from 'native-base';
import {IColors} from 'native-base/lib/typescript/theme/base/colors';

interface Props extends IBadgeProps {
  text?: string;
  textColor?: IColors;
}

const CustomBadge: React.FC<Props> = ({
  variant = 'solid',
  colorScheme,
  rounded = 'lg',
  text,
  textColor = 'white',
  size = 'sm',
  fontSize = '12',
  ...props
}) => {
  return (
    <Badge
      {...props}
      variant={variant}
      rounded={rounded}
      colorScheme={colorScheme}
      size={size}
      fontSize={fontSize}>
      <Text color={textColor} fontSize={fontSize}>
        {text}
      </Text>
    </Badge>
  );
};

export default CustomBadge;
