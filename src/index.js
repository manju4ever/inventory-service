require('babel-polyfill');
require('./server');

// Catch Unhandled Rejections Globally
process.on('unhandledRejection', (reason, p) => {
  console.error('\n[Promise Rejection] (System Level at the best) at Promise: ', p, 'Reason:', reason, '\n');
});
