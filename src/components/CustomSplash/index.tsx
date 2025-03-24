// import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {Animated, Image, Text, View} from 'react-native';

// import logoGif from '../../../assets/lotties/logoAnimation.json';
// import {screen} from '../../utils/constants';
// import {fonts} from '../../styles/fonts';
// import useStyles from './style';
import icons from '../../assets/icons';
import useStyles from './style';
import images from '../../assets/images';
import {screen} from '../../utils/constants';
// import {useLocalizationsRecourses} from '../../utils/apiHelpers';
// import {useLocaleStore} from '../../store/reducer/locale';

export default function CustomSplash({
  show,
  onEnd,
}: {
  show: boolean;
  onEnd: () => void;
}) {
  const {styles, colors, sizes} = useStyles();
  //   const store = useLocaleStore();

  // console.log('Store ====> ', store);

  const [fadeAnim] = useState(new Animated.Value(1));
  const HideCustomSplash = (): void => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      onEnd();
    });
  };
  useEffect(() => {
    if (show) {
      setInterval(() => {
        HideCustomSplash();
      }, 3000);
    }
  }, [show]);

  //   useLocalizationsRecourses();

  return show ? (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      {/* <LottieView
        source={logoGif}
        autoPlay
        loop={false}
        onAnimationFinish={HideCustomSplash}
        style={{width: 225, height: 225, top: 20}}
      /> */}
      <Image
        source={images.SPLASH_LOGO}
        resizeMode="contain"
        style={{width: 225, height: 225}}
      />

      <View
        style={{
          backgroundColor: colors.BACKGROUND,
          padding: screen.width * 0.02,
          borderTopLeftRadius: screen.width * 0.02,
          borderBottomRightRadius: screen.width * 0.02,
          paddingHorizontal: screen.width * 0.06,
          marginTop: -screen.height * 0.07,
        }}>
        {/* <Text
          style={{
            fontSize: sizes.FONTSIZE_HIGH,
            color: colors.PRIMARY,
          }}>
          Fix Everything With Ease
        </Text> */}
      </View>
    </Animated.View>
  ) : null;
}
