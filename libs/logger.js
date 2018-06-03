
const log4js = require("log4js");
log4js.configure({
  appenders: { console: { type: 'file', filename: "./log/console.log" } },
  categories: { default: { appenders: ['console'], level: 'all' } }
});
module.exports = log4js.getLogger();
