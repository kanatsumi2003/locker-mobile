import {View} from 'react-native';
import React from 'react';
import {Control, Controller, Path, RegisterOptions} from 'react-hook-form';
import {FormControl, Heading, IInputProps, Input, TextArea} from 'native-base';

interface Props<T extends object> extends IInputProps {
  label?: string;
  control: Control<T>;
  name: Path<T>;
  rules?: Pick<
    RegisterOptions<T>,
    'maxLength' | 'minLength' | 'validate' | 'required'
  >;
  placeholder?: string;
  type?: 'text' | 'password';
}

const CustomTextArea = <T extends object = object>(props: Props<T>) => {
  const {label, control, name, rules, placeholder, ...rest} = props;
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          {label && <FormControl.Label>{label}</FormControl.Label>}
          <View style={[{borderColor: error ? 'red' : '#e8e8e8'}]}>
            <TextArea
              fontSize="14"
              // py="3"
              autoCompleteType={undefined}
              size="xl"
              borderRadius="lg"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              {...rest}
            />
          </View>
          <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
        </>
      )}
    />
  );
};

export default CustomTextArea;
