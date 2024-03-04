import {Button, Modal} from 'native-base';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectModal, setCloseModal} from '../../stores/global.store';
// import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Calendar from 'react-native-calendar-range-picker';
import {setRangePicker} from '../../stores/order.store';
import CustomButton from '../../components/CustomButton';

dayjs.extend(utc);

const ModalCalendar = () => {
  const dispatch = useDispatch();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const {isOpen, type} = useSelector(selectModal);
  const [picker, setPicker] = useState<{
    from: string | undefined;
    to: string | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const onClose = () => {
    dispatch(setCloseModal());
  };

  const handlePicker = () => {
    dispatch(setRangePicker(picker));
    onClose();
  };

  const isModalOpen = isOpen && type === 'calendar';

  return (
    <Modal
      size="xl"
      isOpen={isModalOpen}
      onClose={onClose}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Chọn ngày tạo</Modal.Header>
        <Modal.Body bg="white">
          <Calendar
            startDate="2020-05-05"
            endDate="2020-05-12"
            onChange={({startDate, endDate}) => {
              setPicker({
                from: startDate
                  ? dayjs(startDate, 'YYYY-MM-DD').utc().format()
                  : undefined,
                to: endDate
                  ? dayjs(endDate, ' YYYY-MM-DD').utc().format()
                  : undefined,
              });
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <CustomButton variant="ghost" onPress={onClose}>
              Huỷ
            </CustomButton>
            <CustomButton onPress={handlePicker}>Chọn</CustomButton>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ModalCalendar;
