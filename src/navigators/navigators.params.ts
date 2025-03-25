export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  ChangePassword: undefined;
  ResetPassword: {code: string; email: string};
  Testing: undefined;
};

export type DrawerParamList = {
  HighRiskCheckIn: undefined;
  ManDownSettings: undefined;
  ChangePassword: undefined;
  CheckInHistory: undefined;
  NotificationsScreen: undefined;
  ShiftDetails: undefined;
  Auth: undefined;
};

export type AppStackParamsList = {
  HomeTabs: undefined;
  TestingScreen: undefined;
};
