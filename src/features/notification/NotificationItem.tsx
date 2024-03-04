import dayjs from 'dayjs';
import {Box, HStack, Heading, Text, VStack} from 'native-base';
import React from 'react';
import {FULL_TIME_FORMAT} from '../../constants/common';
import {INotificationItem} from '../../types/notification/notification';
import {badgeRenderNotificationLevelTag} from '../../utils/badgeRender';
import {renderIcon} from '../../utils/notificationRender';

interface Props extends INotificationItem {}

const NotificationItem: React.FC<Props> = ({
  isRead,
  entityType,
  title,
  content,
  level,
  createdAt,
}) => {
  return (
    <Box p="4" background={isRead ? 'white' : 'info.100'}>
      <HStack space={4}>
        {renderIcon(entityType)}
        <VStack flex={1} space={2}>
          <Heading size="sm" fontSize="md">
            {title}
          </Heading>
          <Text>{content}</Text>
          <HStack alignItems="center" justifyContent="space-between">
            {badgeRenderNotificationLevelTag(level)}
            <Text color="gray.500">
              {dayjs(createdAt).format(FULL_TIME_FORMAT)}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default NotificationItem;
