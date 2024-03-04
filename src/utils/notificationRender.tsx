import {Badge, HStack, Icon, Stack, Text, View} from 'native-base';
import {
  ENTITY_TYPE,
  NOTIFICATION_LEVEL,
  NOTIFICATION_TYPE,
} from '../types/notification/notification';
import {IOrderDetailItem} from '../types/order/order';
import {ILockerItem} from '../types/locker/locker';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {hexToRGB} from './format';

const getNotificationIcon = (
  icon: React.ReactNode,
  color: string,
  backgroundColor: string,
) => {
  return (
    <View
      w="10"
      h="10"
      m="auto"
      borderRadius="full"
      justifyContent="center"
      alignItems="center"
      backgroundColor={backgroundColor}>
      <Icon as={icon} color={color} />
    </View>
  );
};

export const renderIcon = (entityType: ENTITY_TYPE) => {
  const [icon, color, backgroundColor] = (() => {
    switch (entityType) {
      case ENTITY_TYPE.ACCOUNT:
        return [<FontAwesome6 name="user" />, 'primary.400', 'primary.200'];
      case ENTITY_TYPE.ORDER:
        return [<FontAwesome6 name="inbox" />, 'blue.400', 'blue.200'];
      case ENTITY_TYPE.SERVICE:
        return [
          <MaterialCommunityIcons name="tag-outline" />,
          'yellow.400',
          'yellow.200',
        ];
      case ENTITY_TYPE.LOCKER:
        return [
          <MaterialCommunityIcons name="database-outline" />,
          'rose.400',
          'rose.200',
        ];
      default:
        return [
          <MaterialCommunityIcons name="database-outline" />,
          'rose.400',
          'rose.200',
        ];
    }
  })();

  return getNotificationIcon(icon, color, backgroundColor);
};

export const getNotificationRedirectLinkStaff = (
  entityType: ENTITY_TYPE | undefined,
  id: number | undefined,
) => {
  switch (entityType) {
    case ENTITY_TYPE.ORDER:
      return {
        screen: 'StaffOrderDetail',
        id: id,
      };
    case ENTITY_TYPE.LOCKER:
      return {
        screen: 'StaffLockerDetail',
        id: id,
      };
    default:
      return null;
  }
};

export const getNotificationRedirectLinkUser = (
  entityType: ENTITY_TYPE,
  id: number | undefined,
) => {
  switch (entityType) {
    case ENTITY_TYPE.ORDER:
      return {
        screen: 'CustomerOrderDetail',
        id: id,
      };
    case ENTITY_TYPE.LOCKER:
      return {
        screen: 'CustomerLockerDetail',
        id: id,
      };
    case ENTITY_TYPE.PAYMENT:
      return {
        screen: 'CustomerPaymentDetail',
        id: id,
      };
    default:
      return null;
  }
};

export const renderNotificationLevelTag = (level: NOTIFICATION_LEVEL) => {
  switch (level) {
    case NOTIFICATION_LEVEL.CRITICAL:
      return (
        <Badge colorScheme="error" variant="subtle">
          Quan trọng
        </Badge>
      );
    case NOTIFICATION_LEVEL.WARNING:
      return <Badge colorScheme="warning">Cảnh báo</Badge>;
    case NOTIFICATION_LEVEL.INFORMATION:
      return <Badge color="info">Thông tin</Badge>;
  }
};

export const getNotificationStaff = ({
  type,
  dataJson,
  referenceId,
  entityType,
}: {
  type: NOTIFICATION_TYPE;
  dataJson?: string;
  referenceId?: number;
  entityType: ENTITY_TYPE;
}) => {
  const getAddress = (
    address?: string,
    ward?: string,
    district?: string,
    province?: string,
  ) => `${address}, ${ward}, ${district}, ${province}`;

  let locker, order;

  const [title, body, redirect] = (() => {
    const data = dataJson ? JSON.parse(dataJson) : undefined;

    switch (type) {
      case NOTIFICATION_TYPE.SYSTEM_ORDER_CREATED:
        order = data as IOrderDetailItem;

        return [
          'Có một đơn hàng vừa được tạo',
          <Text>
            Đơn hàng <Text>{order?.id}</Text> vừa được tạo ở locker{' '}
            <Text>{order?.locker?.code}</Text>
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkStaff(entityType, referenceId),
          ),
        ];

      case NOTIFICATION_TYPE.SYSTEM_ORDER_COLLECTED:
        order = data as IOrderDetailItem;

        return [
          'Đơn hàng đã được vận chuyển về kho lưu trữ',
          <Text>
            Đơn hàng <Text>{order?.id}</Text> đã được vận chuyển về kho lưu trữ
            để xử lý
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkStaff(entityType, referenceId),
          ),
        ];

      case NOTIFICATION_TYPE.SYSTEM_ORDER_PROCESSED:
        order = data as IOrderDetailItem;

        return [
          'Đơn hàng đã được xử lý hoàn tất',
          <Text>
            Đơn hàng <Text>{order?.id}</Text> đã được xử lý hoàn tất
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkStaff(entityType, referenceId),
          ),
        ];

      case NOTIFICATION_TYPE.SYSTEM_ORDER_RETURNED:
        order = data as IOrderDetailItem;

        return [
          'Đơn hàng đã được hoàn trả về tủ khóa',
          <Text>
            Đơn hàng <Text>{order?.id}</Text> đã được hoàn trả về tủ khóa
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkStaff(entityType, referenceId),
          ),
        ];

      case NOTIFICATION_TYPE.SYSTEM_ORDER_CANCELED:
        order = data as IOrderDetailItem;

        return [
          'Đơn hàng đã bị hủy',
          <Text>
            Đơn hàng <Text>{order?.id}</Text> đã bị hủy
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkStaff(entityType, referenceId),
          ),
        ];

      case NOTIFICATION_TYPE.SYSTEM_ORDER_COMPLETED:
        order = data as IOrderDetailItem;

        return [
          'Đơn hàng đã hoàn tất',
          <Text>
            Đơn hàng <Text>{order?.id}</Text> đã hoàn tất
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkStaff(entityType, referenceId),
          ),
        ];
      case NOTIFICATION_TYPE.SYSTEM_ORDER_OVERTIME:
        order = data as IOrderDetailItem;

        return [
          'Đơn hàng đã vượt quá thời hạn',
          <Text>
            Đơn hàng <Text>{order?.id}</Text> đã vượt quá thời hạn
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkStaff(entityType, referenceId),
          ),
        ];

      case NOTIFICATION_TYPE.SYSTEM_LOCKER_CONNECTED:
        locker = data as ILockerItem;

        return [
          'Locker đã được liên kết với hệ thống',
          <Text>
            Locker <Text>{locker?.name}</Text> - <Text>{locker?.code}</Text> (
            <Text>
              {getAddress(
                locker?.location?.address,
                locker?.location?.ward?.name,
                locker?.location?.district?.name,
                locker?.location?.province?.name,
              )}
            </Text>
            ) đã được liên kết với hệ thống
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkStaff(entityType, referenceId),
          ),
        ];

      case NOTIFICATION_TYPE.SYSTEM_LOCKER_DISCONNECTED:
        locker = data as ILockerItem;

        return [
          'Locker đã ngắt kết nối khỏi hệ thống',
          <Text>
            Locker <Text>{locker?.name}</Text> - <Text>{locker?.code}</Text> (
            <Text>
              {getAddress(
                locker?.location?.address,
                locker?.location?.ward.name,
                locker?.location?.district.name,
                locker?.location?.province.name,
              )}
            </Text>
            ) đã ngắt kết nối khỏi hệ thống
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkStaff(entityType, referenceId),
          ),
        ];

      case NOTIFICATION_TYPE.SYSTEM_LOCKER_BOX_WARNING:
        locker = data as ILockerItem;

        return [
          'Cảnh báo Locker sắp đầy',
          <Text>
            Cảnh báo Locker <Text>{locker?.name}</Text> -{' '}
            <Text>{locker?.code}</Text> (
            <Text>
              {getAddress(
                locker?.location?.address,
                locker?.location?.ward.name,
                locker?.location?.district.name,
                locker?.location?.province.name,
              )}
            </Text>
            ) sắp dầy
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkStaff(entityType, referenceId),
          ),
        ];

      case NOTIFICATION_TYPE.SYSTEM_LOCKER_BOX_OVERLOADED:
        locker = data as ILockerItem;

        return [
          'Locker đã quá tải',
          <Text>
            Locker <Text>{locker?.name}</Text> - <Text>{locker?.code}</Text> (
            <Text>
              {getAddress(
                locker?.location?.address,
                locker?.location?.ward.name,
                locker?.location?.district.name,
                locker?.location?.province.name,
              )}
            </Text>
            ) đã quá tải
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkStaff(entityType, referenceId),
          ),
        ];

      case NOTIFICATION_TYPE.ACCOUNT_OTP_CREATED:
        return [
          'Otp của bạn vừa được khởi tạo',
          <Text>Otp của bạn vừa được khởi tạo</Text>,
          undefined,
        ];

      case NOTIFICATION_TYPE.SYSTEM_STAFF_CREATED:
        return [
          'Nhân viên mới được thêm vào cửa hàng',
          <Text>Nhân viên mới được thêm vào cửa hàng</Text>,
          '',
        ];

      default:
        return [
          'Bạn có thông báo mới',
          <Text>Bạn có thông báo mới</Text>,
          undefined,
        ];
    }
  })();

  return {title, body, redirect};
};

export const getNotificationUser = ({
  type,
  dataJson,
  referenceId,
  entityType,
}: {
  type: NOTIFICATION_TYPE;
  dataJson?: string;
  referenceId?: number;
  entityType: ENTITY_TYPE;
}) => {
  const getAddress = (
    address?: string,
    ward?: string,
    district?: string,
    province?: string,
  ) => `${address}, ${ward}, ${district}, ${province}`;

  let locker, order;

  const [title, body, redirect] = (() => {
    const data = dataJson ? JSON.parse(dataJson) : undefined;

    switch (type) {
      case NOTIFICATION_TYPE.SYSTEM_ORDER_CREATED:
        order = data as IOrderDetailItem;

        return [
          'Có một đơn hàng vừa được tạo',
          <Text>
            Đơn hàng <Text>{order?.id}</Text> vừa được tạo ở locker{' '}
            <Text>{order?.locker?.code}</Text>
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkUser(entityType, referenceId),
          ),
        ];

      case NOTIFICATION_TYPE.SYSTEM_ORDER_COLLECTED:
        order = data as IOrderDetailItem;

        return [
          'Đơn hàng đã được vận chuyển về kho lưu trữ',
          <Text>
            Đơn hàng <Text>{order?.id}</Text> đã được vận chuyển về kho lưu trữ
            để xử lý
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkUser(entityType, referenceId),
          ),
        ];

      case NOTIFICATION_TYPE.SYSTEM_ORDER_PROCESSED:
        order = data as IOrderDetailItem;

        return [
          'Đơn hàng đã được xử lý hoàn tất',
          <Text>
            Đơn hàng <Text>{order?.id}</Text> đã được xử lý hoàn tất
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkUser(entityType, referenceId),
          ),
        ];

      case NOTIFICATION_TYPE.SYSTEM_ORDER_RETURNED:
        order = data as IOrderDetailItem;

        return [
          'Đơn hàng đã được hoàn trả về tủ khóa',
          <Text>
            Đơn hàng <Text>{order?.id}</Text> đã được hoàn trả về tủ khóa
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkUser(entityType, referenceId),
          ),
        ];

      case NOTIFICATION_TYPE.SYSTEM_ORDER_CANCELED:
        order = data as IOrderDetailItem;

        return [
          'Đơn hàng đã bị hủy',
          <Text>
            Đơn hàng <Text>{order?.id}</Text> đã bị hủy
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkUser(entityType, referenceId),
          ),
        ];

      case NOTIFICATION_TYPE.SYSTEM_ORDER_COMPLETED:
        order = data as IOrderDetailItem;

        return [
          'Đơn hàng đã hoàn tất',
          <Text>
            Đơn hàng <Text>{order?.id}</Text> đã hoàn tất
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkUser(entityType, referenceId),
          ),
        ];
      case NOTIFICATION_TYPE.SYSTEM_ORDER_OVERTIME:
        order = data as IOrderDetailItem;

        return [
          'Đơn hàng đã vượt quá thời hạn',
          <Text>
            Đơn hàng <Text>{order?.id}</Text> đã vượt quá thời hạn
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkUser(entityType, referenceId),
          ),
        ];

      case NOTIFICATION_TYPE.SYSTEM_LOCKER_CONNECTED:
        locker = data as ILockerItem;

        return [
          'Locker đã được liên kết với hệ thống',
          <Text>
            Locker <Text>{locker?.name}</Text> - <Text>{locker?.code}</Text> (
            <Text>
              {getAddress(
                locker?.location?.address,
                locker?.location?.ward?.name,
                locker?.location?.district?.name,
                locker?.location?.province?.name,
              )}
            </Text>
            ) đã được liên kết với hệ thống
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkUser(entityType, referenceId),
          ),
        ];

      case NOTIFICATION_TYPE.SYSTEM_LOCKER_DISCONNECTED:
        locker = data as ILockerItem;

        return [
          'Locker đã ngắt kết nối khỏi hệ thống',
          <Text>
            Locker <Text>{locker?.name}</Text> - <Text>{locker?.code}</Text> (
            <Text>
              {getAddress(
                locker?.location?.address,
                locker?.location?.ward.name,
                locker?.location?.district.name,
                locker?.location?.province.name,
              )}
            </Text>
            ) đã ngắt kết nối khỏi hệ thống
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkUser(entityType, referenceId),
          ),
        ];

      case NOTIFICATION_TYPE.SYSTEM_LOCKER_BOX_WARNING:
        locker = data as ILockerItem;

        return [
          'Cảnh báo Locker sắp đầy',
          <Text>
            Cảnh báo Locker <Text>{locker?.name}</Text> -{' '}
            <Text>{locker?.code}</Text> (
            <Text>
              {getAddress(
                locker?.location?.address,
                locker?.location?.ward.name,
                locker?.location?.district.name,
                locker?.location?.province.name,
              )}
            </Text>
            ) sắp dầy
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkUser(entityType, referenceId),
          ),
        ];

      case NOTIFICATION_TYPE.SYSTEM_LOCKER_BOX_OVERLOADED:
        locker = data as ILockerItem;

        return [
          'Locker đã quá tải',
          <Text>
            Locker <Text>{locker?.name}</Text> - <Text>{locker?.code}</Text> (
            <Text>
              {getAddress(
                locker?.location?.address,
                locker?.location?.ward.name,
                locker?.location?.district.name,
                locker?.location?.province.name,
              )}
            </Text>
            ) đã quá tải
          </Text>,
          JSON.stringify(
            getNotificationRedirectLinkUser(entityType, referenceId),
          ),
        ];

      case NOTIFICATION_TYPE.ACCOUNT_OTP_CREATED:
        return [
          'Otp của bạn vừa được khởi tạo',
          <Text>Otp của bạn vừa được khởi tạo</Text>,
          undefined,
        ];

      case NOTIFICATION_TYPE.SYSTEM_STAFF_CREATED:
        return [
          'Nhân viên mới được thêm vào cửa hàng',
          <Text>Nhân viên mới được thêm vào cửa hàng</Text>,
          '',
        ];

      default:
        return [
          'Bạn có thông báo mới',
          <Text>Bạn có thông báo mới</Text>,
          undefined,
        ];
    }
  })();

  return {title, body, redirect};
};
