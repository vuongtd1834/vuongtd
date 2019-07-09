export default class CustomEventPolyfill {
  static customEvent() {
    if (typeof window.CustomEvent === "function") {
      return false
    }

    function CustomEvent (event, params) {
      params = params || {bubbles: false, cancelable: false, detail: void 0};
      const evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
    return window.CustomEvent
  }
}
