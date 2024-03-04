import dayjs from 'dayjs';
import {Text, View, VStack, Image, HStack} from 'native-base';
import React from 'react';
import Timeline from 'react-native-timeline-flatlist';
import CustomSectionTitle from '../../../components/CustomSectionTitle';
import {FULL_TIME_FORMAT} from '../../../constants/common';
import {ITimeLineItem} from '../../../types/order/order';
import {badgeRenderOrderStatus} from '../../../utils/badgeRender';

interface Props {
  data?: ITimeLineItem[];
}

interface RowData {
  time: string;
  title: string;
  description?: string;
  imageUrl?: string;
}

const TimelineSection: React.FC<Props> = ({data}) => {
  const renderDetail = (rowData: RowData, sectionID: number, rowID: number) => {
    const title = <Text>{rowData?.title}</Text>;

    let desc = null;

    if (rowData?.description) {
      desc = (
        <HStack
          alignItems="center"
          space={2}
          mt="4"
          rounded="lg"
          borderWidth={1}
          borderColor="gray.300"
          p="2">
          <Image
            borderRadius="full"
            w="10"
            h="10"
            source={
              rowData?.imageUrl
                ? {uri: rowData?.imageUrl}
                : require('../../../assets/cleaning-staff.png')
            }
          />
          <Text>{rowData?.description}</Text>
        </HStack>
      );
    }

    return (
      <View flex={1}>
        {title}
        {desc}
      </View>
    );
  };

  return (
    <VStack space="4">
      <CustomSectionTitle text="Tiến trình" />

      <Timeline
        isUsingFlatlist={true}
        innerCircle="dot"
        data={data?.map(item => ({
          time: dayjs(item.updatedAt).format(FULL_TIME_FORMAT),
          title: badgeRenderOrderStatus(item.status),
          ...(item?.staff && {
            description: `${item?.staff?.fullName}\n${item?.staff?.phoneNumber}`,
            imageUrl: item?.staff?.avatar,
          }),
        }))}
        key="timeline"
        renderDetail={renderDetail}
        detailContainerStyle={{bottom: 10}}
        timeStyle={{
          textAlign: 'center',
        }}
        columnFormat="single-column-left"
      />
    </VStack>
  );
};

export default TimelineSection;
