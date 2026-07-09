function runWatchdog() {
  incrementStats(CONFIG.STATS_KEYS.TOTAL_CHECKS);

  var webhookInfo = getWebhookInfoV2();
  var comparison = compareWebhookUrlV2(webhookInfo);
  var health = evaluateWebhookHealthV2(webhookInfo, comparison);

  if (health.level === 'GOOD') {
    logInfo('Watchdog completed', health.reason);
    return;
  }

  if (health.level === 'WARNING') {
    logWarning('Watchdog warning', health.reason);
    return;
  }

  incrementStats(CONFIG.STATS_KEYS.ERROR_COUNT);
  var errorMessage = health.reason + ' Expected: ' + comparison.expectedUrl + ' Current: ' + comparison.currentUrl;
  logError('Watchdog detected mismatch', errorMessage);

  var repairSucceeded = attemptRepair(errorMessage);
  if (!repairSucceeded) {
    notifyRepairFailure(errorMessage);
  }
}

function dailyReportTrigger() {
  sendDailyReport();
}
