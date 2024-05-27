import { RootState } from 'types';

export const selectUserPayLoad = (state: RootState) =>
  state.manageUser?.manageUserProfilePayload;

export const selectEditProfile = (state: RootState) =>
  state.manageUser?.editProfile;

export const selectGenderValue = (state: RootState) =>
  state.manageUser?.genderValue;
export const selectDobValue = (state: RootState) => state.manageUser?.dobValue;
export const selectPreviewFullName = (state: RootState) =>
  state.manageUser?.previewFullName;
export const selectPreviewEmail = (state: RootState) =>
  state.manageUser?.previewEmail;
export const selectSubscriptionPlans = (state: RootState) =>
  state.manageUser?.subscriptionPlans;
export const selectCurrentUserSubscription = (state: RootState) =>
  state.manageUser?.currentUserSubscription;
export const selectPaymentIntendPayload = (state: RootState) =>
  state.manageUser?.paymentIntendPayload;
export const selectPaymentIntendData = (state: RootState) =>
  state.manageUser?.paymentIntendData;
export const selectChoosedPlan = (state: RootState) =>
  state.manageUser?.choosedPlan;
export const selectPayment_id = (state: RootState) =>
  state.manageUser?.payment_id;
export const selectPaymentUpdateRequestPayload = (state: RootState) =>
  state.manageUser?.paymentUpdateRequestPayload;
export const selectSettingsTabVal = (state: RootState) =>
  state.manageUser?.settingsTabVal;
export const selectPaymentLoader = (state: RootState) =>
  state.manageUser?.paymentLoader;
export const selectTriggerApi = (state: RootState) =>
  state.manageUser?.triggerApi;
