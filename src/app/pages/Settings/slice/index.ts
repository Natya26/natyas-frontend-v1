import { PayloadAction } from '@reduxjs/toolkit';
import { Cast } from 'services/openapi/models/Cast';
import { Genre } from 'services/openapi/models/Genre';
import { Language } from 'services/openapi/models/Language';
import { Series } from 'services/openapi/models/Series';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { ManageUserState } from './types';
import { SubscriptionPlan } from 'services/openapi/models/SubscriptionPlan';
import { PaymentIntendData } from 'services/openapi/models/PaymentIntendResponse';
import { PaymentIntendRequest } from 'services/openapi/models/PaymentIntendRequest';
import { PaymentUpdateRequest } from 'services/openapi/models/PaymentUpdateRequest';
import { Subscription } from 'services/openapi/models/Subscription';
export const initialState: ManageUserState = {
  manageUserProfilePayload: {
    first_name: '',
    last_name: '',
    email: '',
    phone_code: '+91',
    phone: '',
    gender: 'Male',
    date_of_birth: '',
    country_code: 'IN',
  },
  editProfile: false,
  genderValue: undefined,
  dobValue: null,
  previewFullName: '',
  previewEmail: '',
  subscriptionPlans: [],
  currentUserSubscription: {
    id: 0,
    subscription_plan_id: 0,
    user_id: '',
    valid_from: '',
    valid_till: '',
    active: false,
    created_at: '',
    updated_at: '',
  },
  paymentIntendPayload: {
    subscription_plan_id: undefined,
    payment_gateway: 'STRIPE', //default value is 'STRIPE'
  },
  paymentIntendData: {
    paymentIntent: '',
    paymentId: undefined,
    publishableKey: '',
    paymentGateway: 'STRIPE', //default value "STRIPE"
  },
  choosedPlan: {},
  payment_id: 0,
  paymentUpdateRequestPayload: { status: 'COMPLETED' }, //default value of status is "COMPLETED"
  settingsTabVal: 0,
  paymentLoader: false,
  triggerApi: false,
};

const slice = createSlice({
  name: 'manageUser',
  initialState,
  reducers: {
    changeFirstname(state, action: PayloadAction<string>) {
      if (state.manageUserProfilePayload) {
        state.manageUserProfilePayload.first_name = action.payload;
      }
    },
    changeLastName(state, action: PayloadAction<string>) {
      if (state.manageUserProfilePayload) {
        state.manageUserProfilePayload.last_name = action.payload;
      }
    },
    changeDateofBirth(state, action: PayloadAction<string>) {
      if (state.manageUserProfilePayload) {
        state.manageUserProfilePayload.date_of_birth = action.payload;
      }
    },
    changePhoneCode(state, action: PayloadAction<string>) {
      if (state.manageUserProfilePayload) {
        state.manageUserProfilePayload.phone_code = action.payload;
      }
    },
    changePhoneNumber(state, action: PayloadAction<string>) {
      if (state.manageUserProfilePayload) {
        state.manageUserProfilePayload.phone = action.payload;
      }
    },
    changeEmail(state, action: PayloadAction<string>) {
      if (state.manageUserProfilePayload) {
        state.manageUserProfilePayload.email = action.payload;
      }
    },
    changeGender(state, action: PayloadAction<string>) {
      if (state.manageUserProfilePayload) {
        state.manageUserProfilePayload.gender = action.payload;
      }
    },
    changeDateOfBirth(state, action: PayloadAction<string>) {
      if (state.manageUserProfilePayload) {
        state.manageUserProfilePayload.date_of_birth = action.payload;
      }
    },
    changeCountryCode(state, action: PayloadAction<string>) {
      if (state.manageUserProfilePayload) {
        state.manageUserProfilePayload.country_code = action.payload;
      }
    },
    changeEditMode(state, action: PayloadAction<boolean>) {
      state.editProfile = action.payload;
    },
    changeGenderValue(state, action: PayloadAction<number | string>) {
      state.genderValue = action.payload;
    },
    changeDobValue(state, action: PayloadAction<Date | null>) {
      state.dobValue = action.payload;
    },
    setPreviewFullName(state, action: PayloadAction<string>) {
      state.previewFullName = action.payload;
    },
    setPreviewEmail(state, action: PayloadAction<string>) {
      state.previewEmail = action.payload;
    },
    setSubscriptionPlans(state, action: PayloadAction<SubscriptionPlan[]>) {
      state.subscriptionPlans = action.payload;
    },
    setCurrentUserSubscription(state, action: PayloadAction<Subscription>) {
      state.currentUserSubscription = action.payload;
    },
    setPaymentIntendPayload(
      state,
      action: PayloadAction<PaymentIntendRequest>,
    ) {
      state.paymentIntendPayload = action.payload;
    },
    setPaymentIntendData(state, action: PayloadAction<PaymentIntendData>) {
      state.paymentIntendData = action.payload;
    },
    setChoosedPlan(state, action: PayloadAction<SubscriptionPlan>) {
      state.choosedPlan = action.payload;
    },
    setPayment_id(state, action: PayloadAction<number>) {
      state.payment_id = action.payload;
    },
    setPaymentUpdateRequestPayload(
      state,
      action: PayloadAction<PaymentUpdateRequest>,
    ) {
      state.paymentUpdateRequestPayload = action.payload;
    },
    setSettingsTabVal(state, action: PayloadAction<number>) {
      state.settingsTabVal = action.payload;
    },
    setPaymentLoader(state, action: PayloadAction<boolean>) {
      state.paymentLoader = action.payload;
    },
    setTriggerApi(state, action: PayloadAction<boolean>) {
      state.triggerApi = action.payload;
    },
  },
});

export const { actions: manageUser } = slice;

export const useManageUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
