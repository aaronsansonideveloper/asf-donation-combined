if (process.env.IS_PROXY) {
  const { bootstrap } = require('global-agent');
  process.env.GLOBAL_AGENT_HTTP_PROXY = 'http://127.0.0.1:8118'; // 代理地址:端口
  bootstrap();
}
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // destination: `https://donation.aaronsansonifoundation.org/api/:path*`,
        destination: `http://localhost:9008/api/:path*`,
      },
    ];
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack(config) {
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: ['@svgr/webpack'],
    // });
    config.module.rules.push({
      test: /\.node/,
      use: 'raw-loader',
    });
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
      'supports-color': 'commonjs supports-color',
    });
    return config;
  },
};
