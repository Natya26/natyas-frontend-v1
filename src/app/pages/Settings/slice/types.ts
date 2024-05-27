import { ModifyUserPayLoad } from 'services/openapi/models/ModifyUserPayLoad';
import { PaymentIntendRequest } from 'services/openapi/models/PaymentIntendRequest';
import { PaymentIntendData } from 'services/openapi/models/PaymentIntendResponse';
import { PaymentUpdateRequest } from 'services/openapi/models/PaymentUpdateRequest';
import { Subscription } from 'services/openapi/models/Subscription';
import { SubscriptionPlan } from 'services/openapi/models/SubscriptionPlan';

/* --- STATE --- */
export interface ManageUserState {
  manageUserProfilePayload?: ModifyUserPayLoad;
  editProfile?: boolean;
  genderValue?: number | string;
  dobValue?: Date | null;
  previewFullName?: string;
  previewEmail?: string;
  subscriptionPlans?: SubscriptionPlan[];
  currentUserSubscription?: Subscription;
  paymentIntendPayload?: PaymentIntendRequest;
  paymentIntendData?: PaymentIntendData;
  choosedPlan?: SubscriptionPlan;
  payment_id?: number;
  paymentUpdateRequestPayload?: PaymentUpdateRequest;
  settingsTabVal?: number;
  paymentLoader?: boolean;
  triggerApi?: boolean;
}
