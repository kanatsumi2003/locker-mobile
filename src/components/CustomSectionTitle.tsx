import {HStack, ITextProps, Text, View} from 'native-base';
import React from 'react';

interface Props extends ITextProps {
  text: string;
  subText?: string;
}

const CustomSectionTitle: React.FC<Props> = ({text, subText, ...props}) => {
  return (
    <HStack alignItems="center" space="1">
      <Text {...props} fontSize={'md'} fontWeight={'semibold'}>
        {text}
      </Text>
      {subText && (
        <Text fontSize={'md'} fontStyle="italic">
          {subText}
        </Text>
      )}
    </HStack>
  );
};

export default CustomSectionTitle;
