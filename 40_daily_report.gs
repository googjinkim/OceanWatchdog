function sendDailyReport() {
  var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  var lastDate = getConfigValue(CONFIG.PROPERTY.LAST_DAILY_REPORT_DATE, '');

  if (lastDate === today) {
    return false;
  }

  var stats = getStats();
  var reportTitle = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'M/d') + ' 상태 점검';
  var message = [
    '<b>' + reportTitle + '</b>',
    '- 총 점검: ' + stats.totalChecks + '회',
    '- Error 발생: ' + stats.errorCount + '건',
    '- Repair 시도: ' + stats.repairAttempts + '건',
    '- Repair 성공: ' + stats.repairSuccess + '건',
    '- Repair 실패: ' + stats.repairFailure + '건',
    '- 현재 상태: ' + (stats.repairFailure === 0 ? '양호' : '주의')
  ].join('\n');

  sendTelegramMessage(message);
  setConfigValue(CONFIG.PROPERTY.LAST_DAILY_REPORT_DATE, today);
  return true;
}
