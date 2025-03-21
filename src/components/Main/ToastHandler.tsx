import Toast from 'react-native-toast-message';
import SuccessToastMessage from '../AppToast/SuccessToastMessage';
import ErrorToastMessage from '../AppToast/ErrorToastMessage';
import WarningToastMessage from '../AppToast/WarningToastMessage';

const toastConfig = {
  success: (props: any) => <SuccessToastMessage toastProps={props} />,
  error: (props: any) => <ErrorToastMessage toastProps={props} />,
  warning: (props: any) => <WarningToastMessage toastProps={props} />,
};

const ToastHandler = () => {
  return <Toast config={toastConfig} position={'top'} />;
};

export default ToastHandler;