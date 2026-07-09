var CONFIG = {
  PROPERTY: {
    TELEGRAM_BOT_TOKEN: 'TELEGRAM_BOT_TOKEN',
    TELEGRAM_CHAT_ID: 'TELEGRAM_CHAT_ID',
    EXPECTED_WEBHOOK_URL: 'EXPECTED_WEBHOOK_URL',
    LAST_DAILY_REPORT_DATE: 'LAST_DAILY_REPORT_DATE'
  },
  STATS_KEYS: {
    TOTAL_CHECKS: 'TOTAL_CHECKS',
    ERROR_COUNT: 'ERROR_COUNT',
    REPAIR_ATTEMPTS: 'REPAIR_ATTEMPTS',
    REPAIR_SUCCESS: 'REPAIR_SUCCESS',
    REPAIR_FAILURE: 'REPAIR_FAILURE'
  }
};

function getScriptProperties() {
  return PropertiesService.getScriptProperties();
}

function getConfigValue(key, defaultValue) {
  var value = getScriptProperties().getProperty(key);
  return value !== null ? value : defaultValue;
}

function setConfigValue(key, value) {
  getScriptProperties().setProperty(key, String(value));
}

function getStats() {
  var props = getScriptProperties();
  return {
    totalChecks: parseInt(props.getProperty(CONFIG.STATS_KEYS.TOTAL_CHECKS) || '0', 10),
    errorCount: parseInt(props.getProperty(CONFIG.STATS_KEYS.ERROR_COUNT) || '0', 10),
    repairAttempts: parseInt(props.getProperty(CONFIG.STATS_KEYS.REPAIR_ATTEMPTS) || '0', 10),
    repairSuccess: parseInt(props.getProperty(CONFIG.STATS_KEYS.REPAIR_SUCCESS) || '0', 10),
    repairFailure: parseInt(props.getProperty(CONFIG.STATS_KEYS.REPAIR_FAILURE) || '0', 10)
  };
}

function incrementStats(key) {
  var props = getScriptProperties();
  var current = parseInt(props.getProperty(key) || '0', 10);
  props.setProperty(key, String(current + 1));
}
