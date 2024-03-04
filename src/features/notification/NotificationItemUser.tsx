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
import {getNotificationRedirectLinkUser} from '../../utils/notificationRender';
import NotificationItem from './NotificationItem';

interface Props extends INotificationItem {}

const NotificationItemUser: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const {entityType, referenceId, id} = props;

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [readNotification] = useReadNotificationMutation();

  const [trigger, {data: unread}] = useLazyUnreadCountQuery();

  const handleRead = () => {
    const redirectLinkUser = getNotificationRedirectLinkUser(
      entityType as ENTITY_TYPE,
      Number(referenceId),
    );

    readNotification({id});
    trigger();
    redirectLinkUser?.screen &&
      navigation.navigate(
        redirectLinkUser?.screen,
        redirectLinkUser?.id && {id: redirectLinkUser?.id},
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

export default NotificationItemUser;
