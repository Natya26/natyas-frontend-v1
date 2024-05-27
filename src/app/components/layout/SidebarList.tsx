import React from 'react';
import { ReactComponent as Dashboard } from './assets/img/icon/sidebar/dashboard.svg';
import { ReactComponent as Videos } from './assets/img/icon/sidebar/video.svg';
import { ReactComponent as Users } from './assets/img/icon/sidebar/users.svg';
import { ReactComponent as Subscrption } from './assets/img/icon/sidebar/subscription.svg';
import { ReactComponent as Series } from './assets/img/icon/sidebar/series.svg';

export interface SidebarListData {
  icon: any;
  label: string;
  route: string;
}
export const SidebarList: SidebarListData[] = [
  {
    icon: <Dashboard />,
    label: 'Dashboard',
    route: '/dashboard',
  },
  {
    icon: <Videos />,
    label: 'Manage Videos',
    route: '/videos',
  },
  {
    icon: <Users />,
    label: 'Manage Users ',
    route: '/users',
  },
  {
    icon: <Subscrption />,
    label: 'Subscrption',
    route: '/subscriptions',
  },
  {
    icon: <Series />,
    label: 'Manage Series',
    route: '/series',
  },
];
