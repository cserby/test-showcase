const { setWorldConstructor } = require('cucumber');
const puppeteer = require('puppeteer');
const scope = require('./support/scope');
const expect = require('expect');
const Logging = require('./support/logging');

const World = function({ attach, parameters }) {
  this.attach = attach;
  this.parameters = parameters || {};
  this.parameters.host = this.parameters.host || 'https://www.libri.hu';
  this.parameters.user_email = this.parameters.user_email || process.env.LIBRI_USER_EMAIL;
  this.parameters.user_password = this.parameters.user_password || process.env.LIBRI_USER_PASSWORD;
  this.logging = new Logging(text => {
    // eslint-disable-next-line no-console
    console.log(text);
    this.attach(text);
  }, this.parameters.logLevel || 'DEBUG');
  scope.driver = puppeteer;

  this.elementForXpath = xpathSelector => {
    return this.page.$x(xpathSelector).then(selectedElements => {
      expect(selectedElements).toHaveLength(1);
      return selectedElements[0];
    });
  };

  this.isElementDisabled = element => {
    return element.getProperty('disabled').then(disabledP => disabledP.jsonValue());
  };

  this.getTextContent = element => {
    return this.page.evaluate(e => e.textContent, element);
  };

  this.parseRequestParams = url => {
    return (url.split(/\?(.+)/)[1] || '').split('&').reduce((prev, cur) => {
      const [paramName, paramValue] = cur.split(/=(.*)/);
      return paramName ? Object.assign(prev, { [paramName]: paramValue }) : prev;
    }, {});
  };

  this.waitForResponse = urlRegex => {
    return new Promise(resolve => {
      this.page.on('response', function callback(response) {
        if (response.url().match(new RegExp(urlRegex))) {
          resolve(response);
          this.page.removeListener('response', callback);
        }
      });
    });
  };

  this.waitForTransitionEnd = element => {
    return this.page.evaluate(element => {
      return new Promise(resolve => {
        const onEnd = function() {
          element.removeEventListener('transitionend', onEnd);
          resolve();
        };
        element.addEventListener('transitionend', onEnd);
      });
    }, element);
  };
};

setWorldConstructor(World);
