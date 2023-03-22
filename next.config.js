module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
        port: '',
        pathname: '/avatar/**',
      },
      {
        protocol: 'http',
        hostname: 'xhr-server.herokuapp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
