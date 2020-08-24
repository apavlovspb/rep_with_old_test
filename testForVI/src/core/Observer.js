export class Observer {
  constructor() {
    this.listeners = {};
  }
  trigger(eventName, ...arg) {
    if (!Array.isArray(this.listeners[eventName])) {
      return false;
    }
    this.listeners[eventName].forEach((listener) => {
      listener(...arg);
    });
  }
  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    console.log(this.listeners);
    return () => {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (listener) => listener !== fn
      );
    };
  }
}
