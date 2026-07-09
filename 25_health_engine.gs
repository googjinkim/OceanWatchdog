function evaluateWebhookHealthV2(webhookInfo, comparison) {
  if (!webhookInfo || !webhookInfo.success) {
    return {
      level: 'ERROR',
      reason: 'Failed to retrieve webhook info from Telegram.',
      shouldRepair: true
    };
  }

  if (!comparison || !comparison.success) {
    return {
      level: 'ERROR',
      reason: 'Webhook comparison could not be completed.',
      shouldRepair: true
    };
  }

  var data = webhookInfo.data || {};
  var isMatched = comparison.isMatch === true;
  var hasLastError = !!data.last_error_message;
  var pendingUpdateCount = parseInt(data.pending_update_count || '0', 10);

  if (isMatched && !hasLastError && pendingUpdateCount < 10) {
    return {
      level: 'GOOD',
      reason: 'Webhook URL is correct and there is no recent error signal.',
      shouldRepair: false
    };
  }

  if (isMatched && (hasLastError || pendingUpdateCount >= 10)) {
    return {
      level: 'WARNING',
      reason: 'Webhook URL is correct but warnings were detected in Telegram webhook state.',
      shouldRepair: false
    };
  }

  return {
    level: 'ERROR',
    reason: 'Webhook URL does not match the expected value.',
    shouldRepair: true
  };
}
