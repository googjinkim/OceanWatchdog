function getTelegramApiBaseUrl() {
  var token = getTelegramBotToken();
  return token ? 'https://api.telegram.org/bot' + token : '';
}

function getWebhookInfoV2() {
  var apiUrl = getTelegramApiBaseUrl() + '/getWebhookInfo';
  if (!apiUrl) {
    return {
      success: false,
      message: 'Telegram bot token is not configured.'
    };
  }

  try {
    var response = UrlFetchApp.fetch(apiUrl, {
      method: 'get',
      muteHttpExceptions: true
    });

    var statusCode = response.getResponseCode();
    var body = response.getContentText();
    var data = JSON.parse(body);

    if (statusCode >= 200 && statusCode < 400 && data && data.ok) {
      return {
        success: true,
        data: data.result,
        message: 'Webhook info retrieved.'
      };
    }

    return {
      success: false,
      message: data && data.description ? data.description : body
    };
  } catch (e) {
    return {
      success: false,
      message: String(e)
    };
  }
}

function compareWebhookUrlV2(webhookInfo) {
  var expectedUrl = getConfigValue(CONFIG.PROPERTY.EXPECTED_WEBHOOK_URL, '').trim();
  var info = webhookInfo || {
    success: false,
    message: 'Webhook info was not provided.'
  };

  if (!info.success) {
    return {
      success: false,
      isMatch: false,
      expectedUrl: expectedUrl,
      currentUrl: '',
      message: info.message
    };
  }

  var currentUrl = info.data && info.data.url ? info.data.url : '';
  var isMatch = currentUrl === expectedUrl;

  return {
    success: true,
    isMatch: isMatch,
    expectedUrl: expectedUrl,
    currentUrl: currentUrl,
    message: isMatch ? 'Webhook URL matches expected URL.' : 'Webhook URL mismatch detected.'
  };
}

function registerWebhookV2() {
  var expectedUrl = getConfigValue(CONFIG.PROPERTY.EXPECTED_WEBHOOK_URL, '').trim();
  var apiUrl = getTelegramApiBaseUrl() + '/setWebhook';

  if (!expectedUrl) {
    return {
      success: false,
      message: 'Expected webhook URL is not configured.'
    };
  }

  if (!apiUrl) {
    return {
      success: false,
      message: 'Telegram bot token is not configured.'
    };
  }

  try {
    var response = UrlFetchApp.fetch(apiUrl, {
      method: 'post',
      payload: {
        url: expectedUrl
      },
      muteHttpExceptions: true
    });

    var statusCode = response.getResponseCode();
    var body = response.getContentText();
    var data = JSON.parse(body);

    if (statusCode >= 200 && statusCode < 400 && data && data.ok) {
      return {
        success: true,
        message: 'Webhook registration succeeded.'
      };
    }

    return {
      success: false,
      message: data && data.description ? data.description : body
    };
  } catch (e) {
    return {
      success: false,
      message: String(e)
    };
  }
}

function deleteWebhookV2() {
  var apiUrl = getTelegramApiBaseUrl() + '/deleteWebhook';
  if (!apiUrl) {
    return {
      success: false,
      message: 'Telegram bot token is not configured.'
    };
  }

  try {
    var response = UrlFetchApp.fetch(apiUrl, {
      method: 'post',
      payload: {},
      muteHttpExceptions: true
    });

    var statusCode = response.getResponseCode();
    var body = response.getContentText();
    var data = JSON.parse(body);

    if (statusCode >= 200 && statusCode < 400 && data && data.ok) {
      return {
        success: true,
        message: 'Webhook deletion succeeded.'
      };
    }

    return {
      success: false,
      message: data && data.description ? data.description : body
    };
  } catch (e) {
    return {
      success: false,
      message: String(e)
    };
  }
}
