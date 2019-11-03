require('dotenv');
const server = require('./src/server');

// Catch Unhandled Rejections Globally
process.on('unhandledRejection', (reason, p) => {
  logger.error('\n[Promise Rejection] (System Level at the best) at Promise: ', p, 'Reason:', reason, '\n');
});
