import React from 'react';
import {View} from 'react-native';

import {OptionActionType} from '../../types';
import OptionOrder from './OptionOrder';
import OptionReservation from './OptionReservation';

interface Props {
  type: OptionActionType;
}

const views = {
  order: OptionOrder,
  reservation: OptionReservation,
};

const OptionView: React.FC<Props> = ({type}) => {
  const OptionViewItem = views[type];

  return (
    <View>
      <OptionViewItem />
    </View>
  );
};

export default OptionView;
