function attemptRepair(errorDetails) {
  incrementStats(CONFIG.STATS_KEYS.REPAIR_ATTEMPTS);

  var beforeInfo = getWebhookInfoV2();
  var comparison = compareWebhookUrlV2(beforeInfo);
  if (comparison.isMatch) {
    incrementStats(CONFIG.STATS_KEYS.REPAIR_SUCCESS);
    logInfo('Repair skipped', 'Webhook already matches expected URL.');
    return true;
  }

  var registrationResult = registerWebhookV2();
  if (!registrationResult.success) {
    incrementStats(CONFIG.STATS_KEYS.REPAIR_FAILURE);
    logError('Repair failed', registrationResult.message + ' - ' + errorDetails);
    return false;
  }

  Utilities.sleep(3000);

  var recheckInfo = getWebhookInfoV2();
  var recheckComparison = compareWebhookUrlV2(recheckInfo);
  var recheckHealth = evaluateWebhookHealthV2(recheckInfo, recheckComparison);

  if (recheckHealth.level === 'GOOD' || recheckHealth.level === 'WARNING') {
    incrementStats(CONFIG.STATS_KEYS.REPAIR_SUCCESS);
    logInfo(
      'Repair succeeded',
      'Health: ' + recheckHealth.level +
      ' Expected: ' + recheckComparison.expectedUrl +
      ' Current: ' + recheckComparison.currentUrl
    );
    return true;
  }

  incrementStats(CONFIG.STATS_KEYS.REPAIR_FAILURE);
  logError(
    'Repair failed',
    'Expected: ' + recheckComparison.expectedUrl +
    ' Current: ' + recheckComparison.currentUrl +
    ' Health reason: ' + recheckHealth.reason
  );
  return false;
}
