import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BoxLayout from './BoxLayout';
import {IBoxItem} from '../../types/box/box';
import {ICenterProps} from 'native-base';
import {orderStatusBoxBackgroundColorRender} from '../../utils/orderRender';

interface Props extends Partial<IBoxItem & ICenterProps> {
  number?: number;
  onPress?: () => void;
}

const BoxItemAvailable: React.FC<Props> = ({
  number,
  lastOrder,
  isAvailable,
  description,
  onPress,
  ...props
}) => {
  return (
    <BoxLayout
      {...props}
      onPress={onPress}
      iconColor="green.500"
      bg={orderStatusBoxBackgroundColorRender(lastOrder?.status)}
      icon={<MaterialCommunityIcons name="lock-open-outline" />}
      number={number}
      lastOrder={lastOrder}
      description={description}
      isAvailable={isAvailable}
      title="Tủ trống"
    />
  );
};

export default BoxItemAvailable;
