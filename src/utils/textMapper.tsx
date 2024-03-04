import {PAYMENT_METHOD, PAYMENT_STATUS, PAYMENT_TYPE} from '../types/bill/bill';
import {BOX_STATUS} from '../types/box/box';
import {LOCKER_STATUS} from '../types/locker/locker';
import {NOTIFICATION_LEVEL} from '../types/notification/notification';
import {
  LAUNDRY_ITEM,
  OrderType,
  ORDER_STATUS,
  ORDER_TYPE,
} from '../types/order/order';
import {SERVICE_STATUS} from '../types/service/service';
import {STORE_STATUS} from '../types/store/store';

export const mapOrderStatus = (status: ORDER_STATUS | undefined) => {
  switch (status) {
    case ORDER_STATUS.INITIALIZED:
      return 'Khởi tạo';
    case ORDER_STATUS.WAITING:
      return 'Đang chờ';
    case ORDER_STATUS.COLLECTED:
      return 'Nhận xử lý';
    case ORDER_STATUS.PROCESSING:
      return 'Đang xử lý';
    case ORDER_STATUS.PROCESSED:
      return 'Đã xử lý';
    case ORDER_STATUS.RETURNED:
      return 'Đã hoàn trả';
    case ORDER_STATUS.COMPLETED:
      return 'Hoàn tất';
    case ORDER_STATUS.CANCELED:
      return 'Đã hủy';
    case ORDER_STATUS.RESERVED:
      return 'Đã đặt trước';
    case ORDER_STATUS.OVERTIME:
      return 'Quá hạn';
    case ORDER_STATUS.OVERTIME_PROCESSING:
      return 'Xử lý quá hạn';
    case ORDER_STATUS.UPDATING:
      return 'Gửi thêm đồ';
    default:
      return 'Đặt trước';
  }
};

export const mapOrderType = (type: ORDER_TYPE | undefined) => {
  switch (type) {
    case ORDER_TYPE.LAUNDRY:
      return 'Giặt sấy';
    case ORDER_TYPE.STORAGE:
      return 'Gửi đồ';
    default:
      return '';
  }
};

export const mapBoxStatus = (status: BOX_STATUS | undefined) => {
  switch (status) {
    case BOX_STATUS.ACTIVE:
      return 'Hoạt động';
    case BOX_STATUS.INACTIVE:
      return 'Tạm ngưng';
    default:
      return '';
  }
};

export const mapClothType = (type: LAUNDRY_ITEM) => {
  switch (type) {
    case LAUNDRY_ITEM.HAT:
      return 'Nón';
    case LAUNDRY_ITEM.CAP:
      return 'Mũ lưỡi trai';
    case LAUNDRY_ITEM.TIE:
      return 'Cà vạt';
    case LAUNDRY_ITEM.GLOVES:
      return 'Găng tay';
    case LAUNDRY_ITEM.COAT:
      return 'Áo choàng';
    case LAUNDRY_ITEM.SHIRT:
      return 'Áo sơ mi';
    case LAUNDRY_ITEM.TSHIRT:
      return 'Áo thun';
    case LAUNDRY_ITEM.SWEATER:
      return 'Áo len';
    case LAUNDRY_ITEM.JACKET:
      return 'Áo khoác';
    case LAUNDRY_ITEM.DRESS:
      return 'Váy / Đầm';
    case LAUNDRY_ITEM.SHOES:
      return 'Giày';
    case LAUNDRY_ITEM.JEAN:
      return 'Quần jean';
    case LAUNDRY_ITEM.SOCKS:
      return 'Vớ / Tất';
    case LAUNDRY_ITEM.TEDDY_BEAR:
      return 'Gấu bông';
    case LAUNDRY_ITEM.SHORTS:
      return 'Quần đùi';
    case LAUNDRY_ITEM.BLANKET:
      return 'Mền';
    case LAUNDRY_ITEM.UNDERWARE:
      return 'Quấn lót';
    case LAUNDRY_ITEM.BRA:
      return 'Áo lót';
    case LAUNDRY_ITEM.SCARF:
      return 'Khăn quàng cổ';

    default:
      return '';
  }
};

export const mapLockerStatus = (status: LOCKER_STATUS | undefined) => {
  switch (status) {
    case LOCKER_STATUS.ACTIVE:
      return 'Hoạt động';
    case LOCKER_STATUS.INACTIVE:
      return 'Ngừng hoạt động';
    case LOCKER_STATUS.INITIALIZED:
      return 'Khởi tạo';
    case LOCKER_STATUS.MAINTAINING:
      return 'Bảo trì';
    case LOCKER_STATUS.DISCONNECTED:
      return 'Ngắt kết nối';
    default:
      return '';
  }
};

export const mapServiceStatus = (status: SERVICE_STATUS) => {
  switch (status) {
    case SERVICE_STATUS.ACTIVE:
      return 'Đang hoạt động';
    case SERVICE_STATUS.INACTIVE:
      return 'Tạm ngưng';
    default:
      return 'Tạm ngưng';
  }
};

export const mapStoreStatus = (status: STORE_STATUS | undefined) => {
  switch (status) {
    case STORE_STATUS.ACTIVE:
      return 'Hoạt động';
    case STORE_STATUS.INACTIVE:
      return 'Tạm ngưng';
    default:
      return 'Tạm ngưng';
  }
};

export const mapPaymentStatus = (status: PAYMENT_STATUS | undefined) => {
  switch (status) {
    case PAYMENT_STATUS.CREATED:
      return 'Khởi tạo';
    case PAYMENT_STATUS.COMPLETED:
      return 'Thành công';
    case PAYMENT_STATUS.PROCESSING:
      return 'Đang xử lý';
    case PAYMENT_STATUS.FAILED:
      return 'Thất bại';
    default:
      return 'Đang xử lý';
  }
};

export const mapNotificationLevel = (level: NOTIFICATION_LEVEL | undefined) => {
  switch (level) {
    case NOTIFICATION_LEVEL.CRITICAL:
      return 'Quan trọng';
    case NOTIFICATION_LEVEL.INFORMATION:
      return 'Thông tin';
    case NOTIFICATION_LEVEL.WARNING:
      return 'Cảnh báo';
    default:
      return '';
  }
};

export const mapPaymentType = (type: PAYMENT_TYPE | undefined) => {
  switch (type) {
    case PAYMENT_TYPE.CHECKOUT:
      return 'Thanh toán';
    case PAYMENT_TYPE.DEPOSIT:
      return 'Nạp tiền';
    case PAYMENT_TYPE.RESERVE:
      return 'Đặt chỗ';
    case PAYMENT_TYPE.REFUND:
      return 'Hoàn trả';
    default:
      return '';
  }
};

export const mapPaymentMethod = (type: PAYMENT_METHOD | undefined) => {
  switch (type) {
    case PAYMENT_METHOD.CASH:
      return 'bằng tiền mặt';
    case PAYMENT_METHOD.MOMO:
      return 'từ Momo';
    case PAYMENT_METHOD.VNPAY:
      return 'từ VNPAY';
    case PAYMENT_METHOD.WALLET:
      return 'từ ví';
    default:
      return '';
  }
};

export const orderStatusMapper = (status: ORDER_STATUS): OrderType => {
  switch (status) {
    case ORDER_STATUS.COLLECTED:
    case ORDER_STATUS.PROCESSING:
      return ORDER_STATUS.PROCESSING;
    case ORDER_STATUS.PROCESSED:
      return ORDER_STATUS.PROCESSED;
    case ORDER_STATUS.RETURNED:
      return ORDER_STATUS.RETURNED;
    case ORDER_STATUS.RESERVED:
      return ORDER_STATUS.RESERVED;
    case ORDER_STATUS.OVERTIME_PROCESSING:
      return ORDER_STATUS.OVERTIME_PROCESSING;
    default:
      return undefined;
  }
};
