function getTelegramBotToken() {
  return getConfigValue(CONFIG.PROPERTY.TELEGRAM_BOT_TOKEN, '');
}

function getTelegramChatId() {
  return getConfigValue(CONFIG.PROPERTY.TELEGRAM_CHAT_ID, '');
}

function getTelegramApiUrl() {
  var token = getTelegramBotToken();
  if (!token) {
    return null;
  }
  return 'https://api.telegram.org/bot' + token + '/sendMessage';
}

function sendTelegramMessage(message) {
  var url = getTelegramApiUrl();
  var chatId = getTelegramChatId();

  if (!url || !chatId || !message) {
    return false;
  }

  try {
    UrlFetchApp.fetch(url, {
      method: 'post',
      payload: {
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      },
      muteHttpExceptions: true
    });
    return true;
  } catch (e) {
    logEvent('Telegram send failed', e);
    return false;
  }
}

function notifyRepairFailure(details) {
  var message = '<b>Ocean Watchdog Alert</b>\n' + details;
  return sendTelegramMessage(message);
}
