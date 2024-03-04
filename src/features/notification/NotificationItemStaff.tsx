import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Pressable} from 'native-base';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  useLazyUnreadCountQuery,
  useReadNotificationMutation,
} from '../../services/notificationService';
import {setUnreadNotificationCount} from '../../stores/global.store';
import {
  ENTITY_TYPE,
  INotificationItem,
} from '../../types/notification/notification';
import {getNotificationRedirectLinkStaff} from '../../utils/notificationRender';
import NotificationItem from './NotificationItem';

interface Props extends INotificationItem {}

const NotificationItemStaff: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const {id, entityType, referenceId} = props;

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [readNotification] = useReadNotificationMutation();
  const [trigger, {data: unread}] = useLazyUnreadCountQuery();

  const handleRead = () => {
    const redirectLinkStaff = getNotificationRedirectLinkStaff(
      entityType as ENTITY_TYPE,
      Number(referenceId),
    );
    readNotification({id});
    trigger();
    redirectLinkStaff?.screen &&
      navigation.navigate(
        redirectLinkStaff?.screen,
        redirectLinkStaff?.id && {id: redirectLinkStaff?.id},
      );
  };

  useEffect(() => {
    unread?.count && dispatch(setUnreadNotificationCount(unread?.count || 0));
  }, [unread]);

  return (
    <Pressable onPress={handleRead}>
      <NotificationItem {...props} />
    </Pressable>
  );
};

export default NotificationItemStaff;
