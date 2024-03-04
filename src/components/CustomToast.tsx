import {Alert, HStack, Text, VStack, useToast} from 'native-base';
import {IToastProps} from 'native-base/lib/typescript/components/composites/Toast';
import React from 'react';
import {Platform} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface Props extends IToastProps {
  status: 'success' | 'error' | 'warning' | 'info';
  isClosable?: boolean;
  description: string;
  variant?:
    | 'outline'
    | 'left-accent'
    | 'solid'
    | 'subtle'
    | 'top-accent'
    | 'outline-light';
}

const CustomToast: React.FC<Props> = ({
  status = 'info',
  title,
  variant = 'left-accent',
  description,
}) => {
  const toastTopAnimation = useSharedValue(-32);
  const animatedTopStyles = useAnimatedStyle(() => {
    return {
      top: toastTopAnimation.value,
    };
  });
  const TOP_VALUE = Platform.OS === 'ios' ? 60 : 20;

  const toast = useToast();

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = toastTopAnimation.value;
    },
    onActive: (event, ctx) => {
      if (event.translationY < 100) {
        toastTopAnimation.value = withSpring(ctx.startY + event.translationY, {
          damping: 600,
          stiffness: 100,
        });
      }
    },
    onEnd: event => {
      if (event.translationY < 0) {
        toastTopAnimation.value = withTiming(-100, undefined, finish => {
          if (finish) {
            runOnJS(() => toast.closeAll());
          }
        });
      } else if (event.translationY > 0) {
        toastTopAnimation.value = withSequence(
          withTiming(TOP_VALUE),
          withDelay(
            1500,
            withTiming(-100, undefined, finish => {
              if (finish) {
                runOnJS(() => toast.closeAll());
              }
            }),
          ),
        );
      }
    },
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[animatedTopStyles]}>
        <Alert
          variant={variant}
          maxWidth="98%"
          alignSelf="center"
          flexDirection="row"
          status={status}
          shadow="2">
          <VStack space={1} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              alignItems="center"
              justifyContent="space-between">
              <HStack space={2} flexShrink={1} alignItems="center">
                <Alert.Icon />
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  flexShrink={1}
                  color={
                    variant === 'solid'
                      ? 'lightText'
                      : variant !== 'outline'
                      ? 'darkText'
                      : null
                  }>
                  {title}
                </Text>
              </HStack>
            </HStack>
            <Text
              px="6"
              color={
                variant === 'solid'
                  ? 'lightText'
                  : variant !== 'outline'
                  ? 'darkText'
                  : null
              }>
              {description}
            </Text>
          </VStack>
        </Alert>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default CustomToast;
