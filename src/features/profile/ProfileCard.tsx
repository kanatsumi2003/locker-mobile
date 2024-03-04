import {Box, HStack, Heading, Stack, Text} from 'native-base';
import React from 'react';
import {useSelector} from 'react-redux';
import {selectUserInfo} from '../../stores/global.store';
import {IProfile, ROLE} from '../../types/auth/profile';

interface Props extends Partial<IProfile> {}

const ProfileCard: React.FC<Props> = ({
  username,
  fullName,
  phoneNumber,
  description,
}) => {
  const userInfo = useSelector(selectUserInfo);

  return (
    <Box
      w="full"
      rounded="lg"
      overflow="hidden"
      borderColor="blue.500"
      borderWidth="1"
      shadow="2">
      <Stack p="4" space={3} bgColor="blue.500">
        {userInfo?.role === ROLE.LAUNDRY_ATTENDANT && (
          <HStack alignItems="center">
            <Heading size="xs" color="white" mr="2">
              Username:
            </Heading>

            <Text color="white">{username}</Text>
          </HStack>
        )}

        <HStack alignItems="center">
          <Heading size="xs" color="white" mr="2">
            Họ và tên:
          </Heading>

          <Text color="white">{fullName}</Text>
        </HStack>

        <HStack alignItems="center">
          <Heading size="xs" color="white" mr="2">
            Số điện thoại:
          </Heading>

          <Text color="white">{phoneNumber}</Text>
        </HStack>

        <HStack alignItems="center">
          <Heading size="xs" color="white" mr="2">
            Mô tả:
          </Heading>

          <Text color="white">{description}</Text>
        </HStack>
      </Stack>
    </Box>
  );
};

export default ProfileCard;
