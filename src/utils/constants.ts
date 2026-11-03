export const SERVER_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3100/v1/'
    : 'https://api.natya.co.uk/v1/';

const HLS_OBJECT_PATH =
  '/Ambalapravu-%201970%20Malayalam%20Full%20Movie%20_%20Prem%20Nazir%20_%20Sheela%20_%20Madhu%20_%20Sharada.m3u8';

export const HLS_PLAYBACK_URL =
  process.env.NODE_ENV === 'development'
    ? `/hls${HLS_OBJECT_PATH}`
    : `https://d1qm2kjy1vpg2a.cloudfront.net${HLS_OBJECT_PATH}`;
