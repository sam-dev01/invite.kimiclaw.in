(function () {
  var allowedProtocols = ['file:', 'http:', 'https:'];
  function isLocalUrl(input) {
    try {
      var url = new URL(input, window.location.href);
      if (url.protocol === 'file:') return true;
      if (url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '[::1]') return true;
      return false;
    } catch (_) {
      return true;
    }
  }
  function blockedResponse() {
    return Promise.resolve(new Response('', { status: 204, statusText: 'Offline' }));
  }
  var originalFetch = window.fetch;
  if (originalFetch) {
    window.fetch = function (input, init) {
      var target = typeof input === 'string' ? input : input && input.url;
      if (target && !isLocalUrl(target)) return blockedResponse();
      return originalFetch.apply(this, arguments);
    };
  }
  if (navigator.sendBeacon) {
    navigator.sendBeacon = function (url) { return isLocalUrl(url); };
  }
  var originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    this.__offlineBlocked = url && !isLocalUrl(url);
    if (this.__offlineBlocked) url = 'about:blank';
    return originalOpen.apply(this, arguments);
  };
  var originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function () {
    if (this.__offlineBlocked) return;
    return originalSend.apply(this, arguments);
  };
  window.__OFFLINE_MIRROR__ = true;
  console.log("Offline guard loaded.");
})();
