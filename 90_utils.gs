function logEvent(title, details) {
  var timestamp = new Date().toISOString();
  var logEntry = '[' + timestamp + '] [INFO] ' + title + ' - ' + String(details);
  Logger.log(logEntry);
}

function logInfo(title, details) {
  var timestamp = new Date().toISOString();
  var logEntry = '[' + timestamp + '] [INFO] ' + title + ' - ' + String(details);
  Logger.log(logEntry);
}

function logWarning(title, details) {
  var timestamp = new Date().toISOString();
  var logEntry = '[' + timestamp + '] [WARNING] ' + title + ' - ' + String(details);
  Logger.log(logEntry);
}

function logError(title, details) {
  var timestamp = new Date().toISOString();
  var logEntry = '[' + timestamp + '] [ERROR] ' + title + ' - ' + String(details);
  Logger.log(logEntry);
}

function resetStats() {
  var props = getScriptProperties();
  props.setProperty(CONFIG.STATS_KEYS.TOTAL_CHECKS, '0');
  props.setProperty(CONFIG.STATS_KEYS.ERROR_COUNT, '0');
  props.setProperty(CONFIG.STATS_KEYS.REPAIR_ATTEMPTS, '0');
  props.setProperty(CONFIG.STATS_KEYS.REPAIR_SUCCESS, '0');
  props.setProperty(CONFIG.STATS_KEYS.REPAIR_FAILURE, '0');
}
