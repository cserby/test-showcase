/* eslint-disable require-jsdoc */
function Logging(logFunc, _level) {
  const LEVEL_DEBUG = 1;
  const LEVEL_INFO = 2;
  const LEVEL_WARN = 3;
  const LEVEL_ERROR = 4;

  function setLevel(_level) {
    switch (_level) {
      case 'DEBUG':
        return LEVEL_DEBUG;
      case 'INFO':
        return LEVEL_INFO;
      case 'WARN':
        return LEVEL_WARN;
      case 'ERROR':
        return LEVEL_ERROR;
      default:
        return LEVEL_INFO;
    }
  }

  const level = setLevel(_level);

  function addLevel(level) {
    return msg => `[${level}] ${msg}`;
  }

  const addDebug = addLevel('DEBUG');
  const addError = addLevel('ERROR');
  const addInfo = addLevel('INFO');
  const addWarn = addLevel('WARN');

  function callMaybe(func) {
    return typeof func === 'function' ? func() : func;
  }

  function debug(msg) {
    level <= LEVEL_DEBUG && logFunc(addDebug(escapeHtml(callMaybe(msg))));
  }

  function info(msg) {
    level <= LEVEL_INFO && logFunc(addInfo(escapeHtml(callMaybe(msg))));
  }

  function warn(msg) {
    level <= LEVEL_WARN && logFunc(addWarn(escapeHtml(callMaybe(msg))));
  }

  function error(msg) {
    level <= LEVEL_ERROR && logFunc(addError(escapeHtml(callMaybe(msg))));
  }

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function setupDefaultEventLogging(page) {
    // Emitted when the DOM is parsed and ready (without waiting for resources)
    page.once('domcontentloaded', () => debug('✅ DOM is ready'));

    // Emitted when the page is fully loaded
    page.once('load', () => debug('✅ Page is loaded'));

    // Emitted when the page attaches a frame
    page.on('frameattached', () => debug('✅ Frame is attached'));

    // Emitted when a frame within the page is navigated to a new URL
    page.on('framenavigated', () => debug('👉 Frame is navigated'));

    // Emitted when a script within the page uses `console.timeStamp`
    page.on('metrics', data => info(`👉 Timestamp added at ${data.metrics.Timestamp}`));

    // Emitted when a script within the page uses `console`
    page.on('console', message =>
      info(`Console from Browser: [${message.type()}] 👉 ${message.text()}`)
    );

    // Emitted when the page emits an error event (for example, the page crashes)
    page.on('error', err => error(`❌ ${err}`));

    // Emitted when a script within the page has uncaught exception
    page.on('pageerror', err => error(`❌ ${err}`));

    // Emitted when a script within the page uses `alert`, `prompt`, `confirm` or `beforeunload`
    page.on('dialog', async dialog => {
      info(`👉 Dialog: ${dialog.message()}`);
      await dialog.dismiss();
    });

    // Emitted when a new page, that belongs to the browser context, is opened
    page.on('popup', () => debug('👉 New page is opened'));

    // Emitted when the page produces a request
    page.on('request', request => {
      const body = request.postData() ? `\n${request.postData()}` : '';
      debug(`👉 Request: ${request.method()} ${request.url()}${body}`);
    });

    // Emitted when a request, which is produced by the page, fails
    page.on('requestfailed', request =>
      info(
        `❌ Failed request: ${request.method()} ${request.url()} -> ${request.failure().errorText}`
      )
    );

    // Emitted when a request, which is produced by the page, finishes successfully
    page.on('requestfinished', request =>
      debug(`👉 Finished request: ${request.method()} ${request.url()}`)
    );

    // Emitted when a response is received
    page.on('response', async response => {
      const url = response.url();
      let text = '';
      if (url.match(/api\\.stripe\\.com/) || url.match(/\/api\//)) {
        text = `\n${await response.text()}`;
      }
      debug(
        `👉 Response: ${response
          .request()
          .method()} ${response.url()} -> ${response.status()} ${response.statusText()}${text}`
      );
    });

    // Emitted when the page creates a dedicated WebWorker
    page.on('workercreated', worker => debug(`👉 Worker: ${worker.url()}`));

    // Emitted when the page destroys a dedicated WebWorker
    page.on('workerdestroyed', worker => debug(`👉 Destroyed worker: ${worker.url()}`));

    // Emitted when the page detaches a frame
    page.on('framedetached', () => debug('✅ Frame is detached'));

    // Emitted after the page is closed
    page.once('close', () => debug('✅ Page is closed'));
  }

  return { setupDefaultEventLogging, debug, info, warn, error };
}

module.exports = Logging;
