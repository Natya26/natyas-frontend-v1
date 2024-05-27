/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type NotificationItem=
  {
    id?: number;
    notification_id?: null | string,
    type?: string;
    details?: {
      contents?: {  
        en?: string
      };
      headings?:{
        en?: string
      };
    series_id?:number;
    poster?:string;
  }
}


export type GetNotificationResponse={
  err?:boolean;
  msg?:string;
  data?:{
    total?:number;
    page?:number;
    page_length?:number;
    items?: NotificationItem[];
    
    
  };
  details?:any;

}


