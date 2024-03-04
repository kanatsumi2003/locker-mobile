import {IInputProps, Icon, Input} from 'native-base';
import React, {useEffect, useState} from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDebounce} from '../hooks/useDebounce';

interface Props<T> extends IInputProps {
  query: keyof T;
  setParams: React.Dispatch<React.SetStateAction<T>>;
}

const SearchBar = <T extends object = object>({
  placeholder = 'Search...',
  setParams,
  query,
  ...props
}: Props<T>) => {
  const [search, setSearch] = useState<string | null>(null);
  const searchDebounce = useDebounce(search, 300);

  useEffect(() => {
    setParams((prev: T) => ({
      ...prev,
      pageNumber: 1,
      pageSize: 5,
      [query]: searchDebounce || undefined,
    }));
  }, [searchDebounce]);

  return (
    <Input
      {...props}
      colorScheme="blue"
      borderRadius="lg"
      placeholder={placeholder}
      flex={1}
      fontSize="14"
      onChangeText={value => setSearch(value)}
      InputLeftElement={
        <Icon
          m="2"
          ml="3"
          size="6"
          color="gray.400"
          as={<MaterialCommunityIcons name="text-search" />}
        />
      }
    />
  );
};

export default SearchBar;
