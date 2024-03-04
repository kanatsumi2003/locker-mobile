import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BoxLayout from './BoxLayout';
import {IBoxItem} from '../../types/box/box';
import {orderStatusBoxBackgroundColorRender} from '../../utils/orderRender';

interface Props extends Partial<IBoxItem> {
  number?: number;
  onPress?: () => void;
}

const BoxItemLocked: React.FC<Props> = ({
  number,
  lastOrder,
  isAvailable,
  description,
  onPress,
}) => {
  return (
    <BoxLayout
      onPress={onPress}
      iconColor="gray.500"
      bg={orderStatusBoxBackgroundColorRender(lastOrder?.status)}
      icon={<MaterialCommunityIcons name="block-helper" />}
      number={number}
      lastOrder={lastOrder}
      description={description}
      isAvailable={isAvailable}
      title="Bị khoá"
    />
  );
};

export default BoxItemLocked;
