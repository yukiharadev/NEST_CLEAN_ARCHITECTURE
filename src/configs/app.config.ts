export const appConfig = () => ({
  app: {
    globalPrefix: 'api',
    versioning: {
      enable: true,
      type: 'URI',
      prefix: 'v',
      defaultVersion: '1',
    }
  },
});
