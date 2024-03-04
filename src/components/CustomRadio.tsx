import {View} from 'react-native';
import React from 'react';
import {Control, Controller, Path, RegisterOptions} from 'react-hook-form';
import {FormControl, IRadioGroupProps, Radio} from 'native-base';

interface Props<T extends object> extends IRadioGroupProps {
  label?: string;
  control: Control<T>;
  name: Path<T>;
  rules?: Pick<
    RegisterOptions<T>,
    'maxLength' | 'minLength' | 'validate' | 'required'
  >;
  type?: 'text' | 'password';
  children: React.ReactNode;
}

const CustomRadio = <T extends object = object>(props: Props<T>) => {
  const {label, control, name, rules, children, ...rest} = props;
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          {label && <FormControl.Label>{label}</FormControl.Label>}
          <View style={[{borderColor: error ? 'red' : '#e8e8e8'}]}>
            <Radio.Group
              name={name}
              onChange={onChange}
              {...rest}
              colorScheme="blue">
              {children}
            </Radio.Group>
          </View>
          <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
        </>
      )}
    />
  );
};

export default CustomRadio;
