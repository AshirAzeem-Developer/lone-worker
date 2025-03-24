export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  ChangePassword: undefined;
  ResetPassword: {code: string; email: string};
};

export type AppStackParamsList = {
  HomeTabs: undefined;
};
