import {View} from 'react-native';
import React from 'react';
import {Control, Controller, Path, RegisterOptions} from 'react-hook-form';
import {FormControl, ISelectProps, Icon, Radio, Select} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props<T extends object> extends ISelectProps {
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

const CustomSelect = <T extends object = object>(props: Props<T>) => {
  const {label, placeholder, control, name, rules, children, ...rest} = props;
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          {label && <FormControl.Label>{label}</FormControl.Label>}
          <View style={[{borderColor: error ? 'red' : '#e8e8e8'}]}>
            <Select
              selectedValue={value}
              fontSize="14"
              // py="3"
              size="xl"
              borderRadius="lg"
              placeholder={placeholder}
              onValueChange={onChange}
              {...rest}
              dropdownIcon={
                <Icon
                  as={<MaterialCommunityIcons name="chevron-down" />}
                  size="md"
                />
              }>
              {children}
            </Select>
          </View>
          <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
        </>
      )}
    />
  );
};

export default CustomSelect;
