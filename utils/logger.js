const logger = (message) => {
  console.log(`[SECURITY LOG] ${new Date().toISOString()} - ${message}`);
};

module.exports = logger;
