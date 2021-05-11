import React, { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { withReanimatedTimer, advanceAnimationByTime, } from 'react-native-reanimated/lib/reanimated2/jestUtils';
import { mount } from '@quilted/react-testing';

const PinCircle = ({filled = false}) => {
  const animatedValue = useSharedValue(0);
  useEffect(() => {
    animatedValue.value = withTiming(filled ? 0 : 1, {duration: 250});
  }, [animatedValue, filled]);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = animatedValue.value;
    return { transform: [{scale}] };
  });
  
  return (
    <Animated.View
      testID="PinCircle/InnerCircle"
      style={animatedStyle}
    />
  );
}

it('filled prop is true', () => {
  withReanimatedTimer(() => {
    const wrapper = mount(<PinCircle filled={true} />);
    advanceAnimationByTime(250);
    const InnerView = wrapper.find(Animated.View, {testID: 'PinCircle/InnerCircle'});
    expect(InnerView).toHaveAnimatedStyle({transform: [{scale: 0}]});
  });
});

it('filled prop is false', () => {
  withReanimatedTimer(() => {
    const wrapper = mount(<PinCircle filled={false} />);
    advanceAnimationByTime(250);
    const InnerViewAfter = wrapper.find(Animated.View, {testID: 'PinCircle/InnerCircle'});
    expect(InnerViewAfter).toHaveAnimatedStyle({transform: [{scale: 1}]});
  });
});

it('animates the filling circle when the "filled" prop is true', () => {
  withReanimatedTimer(() => {
    const wrapper = mount(<PinCircle filled={false} />);
    advanceAnimationByTime(250);
    const InnerViewAfter = wrapper.find(Animated.View, {testID: 'PinCircle/InnerCircle'});
    expect(InnerViewAfter).toHaveAnimatedStyle({transform: [{scale: 1}]});
  });
});