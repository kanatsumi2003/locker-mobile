import {View} from 'react-native';
import React from 'react';
import {Control, Controller, Path, RegisterOptions} from 'react-hook-form';
import {Checkbox, FormControl, ICheckboxGroupProps} from 'native-base';

interface Props<T extends object> extends ICheckboxGroupProps {
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

const CustomCheckbox = <T extends object = object>(props: Props<T>) => {
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
            <Checkbox.Group
              onChange={onChange}
              value={value}
              {...rest}
              colorScheme="blue">
              {children}
            </Checkbox.Group>
          </View>
          <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
        </>
      )}
    />
  );
};

export default CustomCheckbox;
