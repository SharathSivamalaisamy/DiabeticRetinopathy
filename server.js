// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');

// const app = express();

// // Configure the proxy middleware
// const apiProxy = createProxyMiddleware('/predict', {
//   target: 'http://localhost:5000',
//   changeOrigin: true,
//   headers: {
//     'Access-Control-Allow-Origin': 'http://localhost:3001',
//     'Access-Control-Allow-Headers': 'Content-Type',
//   },
// });

// // Apply the proxy middleware
// app.use(apiProxy);

// // Start the server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Proxy server is running on port ${port}`);
// });
