import React from 'react';
import OptionLayout from './OptionLayout';
import OptionView from './OptionView';

const Options = () => {
  return (
    <OptionLayout>
      <OptionView type="order" />
      <OptionView type="reservation" />
    </OptionLayout>
  );
};

export default Options;
