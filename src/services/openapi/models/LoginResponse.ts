/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { User } from "./User";

export type LoginResponse = {
    err?: boolean;
    msg?: string | null;
    data?: {
        accessToken?: string | null;
        idToken?: string | null;
        refreshToken?: string | null;
        user?: User
    } | null;
    details: any;
};
