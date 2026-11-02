const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/hls',
    createProxyMiddleware({
      target: 'https://d1qm2kjy1vpg2a.cloudfront.net',
      changeOrigin: true,
      secure: true,
      pathRewrite: path => {
        const withoutPrefix = path.replace(/^\/hls/, '');
        return encodeURI(decodeURI(withoutPrefix));
      },
    }),
  );
};
