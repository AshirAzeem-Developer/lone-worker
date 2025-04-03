// linkingService.ts - Manages deep linking events and navigation
import {Linking} from 'react-native';
import 'react-native-url-polyfill/auto';
import {
  NavigationContainerRef,
  NavigationContainerRefContext,
} from '@react-navigation/native';
import {RefObject} from 'react';

export function initDeepLinking(
  navigationRef: RefObject<NavigationContainerRef<any>>, // ✅ Correct type
): () => void {
  // Handle the case where the app was opened via a deep link while closed
  Linking.getInitialURL().then(initialUrl => {
    if (initialUrl) {
      handleDeepLink(initialUrl, navigationRef);
    }
  });

  // Listen for deep link URLs while the app is running (foreground/background)
  const subscription = Linking.addEventListener('url', event => {
    handleDeepLink(event.url, navigationRef);
  });

  // Return a cleanup function to remove the listener when needed
  return () => {
    subscription.remove();
  };
}

function handleDeepLink(
  url: string,
  navigationRef: RefObject<NavigationContainerRef<any>>,
) {
  console.log('Received deep link:', url);

  try {
    const parsedUrl = new URL(url);
    const path = parsedUrl.pathname; // e.g. /resetpassword
    const code = parsedUrl.searchParams.get('code');
    const email = parsedUrl.searchParams.get('email');

    if (path === '/reset-password' && code && email && navigationRef.current) {
      navigationRef.current.navigate('ResetPassword', {
        code,
        email,
      });
    }
  } catch (e) {
    console.warn('Invalid deep link URL:', e);
  }
}
