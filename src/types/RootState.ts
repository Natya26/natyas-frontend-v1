// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { ManageLoginState } from 'app/layouts/OnboardLayout/slice/types';
import { LookupState } from 'store/slices/lookupSlice/types';
import { ManageUserState } from 'app/pages/Settings/slice/types';
import { ManageHomeState } from 'app/pages/HomePage/slice/types';
import { ManageAppState } from 'app/pages/slice/types';
import { ManageSearchPageState } from 'app/pages/SearchPage/slice/types';
import { ManageIndividualViewState } from 'app/pages/IndividualViewPage/slice/types';
import { ManageNotificationState } from 'app/pages/NotificationsPage/slice/types';
import { ManagePlayVideoState } from 'app/pages/PlayVideo/slice/types';
import { ManageListViewState } from 'app/pages/ListView/slice/types';
import { ManageMyListState } from 'app/pages/MyListPage/slice/types';
import { ManageUserDetailsState } from 'app/layouts/HomePageLayout/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
  lookup?: LookupState;
  manageLogin?: ManageLoginState;
  manageUser?: ManageUserState;
  manageHome?: ManageHomeState;
  manageApp?: ManageAppState;
  manageSearchPage?: ManageSearchPageState;
  manageIndividualView?: ManageIndividualViewState;
  manageMyList?: ManageMyListState;
  manageNotification?: ManageNotificationState;
  managePlayVideo?: ManagePlayVideoState;
  manageListView?: ManageListViewState;
  manageUserDetails?: ManageUserDetailsState;
}
