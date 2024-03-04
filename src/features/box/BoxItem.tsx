import React from 'react';
import BoxItemAvailable from './BoxItemAvailable';
import BoxItemUnavailable from './BoxItemUnavailable';
import BoxItemLocked from './BoxItemLocked';
import {ICenterProps, View} from 'native-base';
import {BoxType, IBoxItem} from '../../types/box/box';

interface Props extends Partial<IBoxItem & ICenterProps> {
  type: BoxType;
  onPress?: () => void;
}

const views = {
  available: BoxItemAvailable,
  unavailable: BoxItemUnavailable,
  locked: BoxItemLocked,
};

const BoxItem: React.FC<Props> = ({
  type,
  number,
  lastOrder,
  description,
  isAvailable,
  onPress,
  ...props
}) => {
  const BoxView = views[type];

  return (
    <View mb={4}>
      <BoxView
        {...props}
        onPress={onPress}
        number={number}
        lastOrder={lastOrder}
        description={description}
        isAvailable={isAvailable}
      />
    </View>
  );
};

export default BoxItem;
