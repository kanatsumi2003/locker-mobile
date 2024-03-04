import {Flex, VStack} from 'native-base';
import React from 'react';
import CustomSectionTitle from '../../../components/CustomSectionTitle';
import Empty from '../../../components/Empty';
import BoxItem from '../../../features/box/BoxItem';
import {BoxType, IBoxItem} from '../../../types/box/box';

interface Props {
  data: IBoxItem[] | undefined;
}

const BoxSection: React.FC<Props> = ({data}) => {
  const boxStatusMapper = (box: IBoxItem): BoxType => {
    if (box.isActive) {
      if (box.isAvailable) {
        return 'available';
      }

      return 'unavailable';
    }

    return 'locked';
  };

  return (
    <VStack space={4}>
      <CustomSectionTitle text="Ô tủ" />

      <Flex flexDirection="row" flexWrap="wrap" justifyContent="space-between">
        {data?.length ? (
          data?.map(box => (
            <BoxItem
              type={boxStatusMapper(box)}
              key={box.id}
              number={box.number}
              description={box.description}
              isAvailable={box.isAvailable}
              lastOrder={box.lastOrder}
            />
          ))
        ) : (
          <Empty text="Không có ô tủ nào" />
        )}
      </Flex>
    </VStack>
  );
};

export default React.memo(BoxSection);
