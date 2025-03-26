// linkingService.ts - Manages deep linking events and navigation
import {Linking} from 'react-native';
import {NavigationContainerRef} from '@react-navigation/native';

export function initDeepLinking(
  navigationRef: NavigationContainerRef<any>,
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
  navigationRef: NavigationContainerRef<any>,
) {
  // Parse the URL to determine navigation target
  // Example: app scheme URL like "myapp://Post/42" -> screen "Post" with id 42
  const urlWithoutScheme = url.replace(/.*?:\/\//, ''); // Remove scheme (e.g., "myapp://")
  const [screen, param] = urlWithoutScheme.split('/'); // e.g., screen="Post", param="42"

  if (screen && navigationRef.current) {
    if (param) {
      // Navigate to the screen with a parameter (if provided)
      navigationRef.current.navigate(screen as never, {id: param} as never);
    } else {
      // Navigate to the screen without parameters
      navigationRef.current.navigate(screen as never);
    }
  }
}
