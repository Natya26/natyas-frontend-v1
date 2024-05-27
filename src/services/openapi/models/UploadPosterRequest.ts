/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export interface UploadPosterRequest extends FormData {
    append(name: 'file' | 'type', value: 'ADD' | 'REMOVE' | Blob): void
};
