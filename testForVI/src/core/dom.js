class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }
  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    this.$el.append(node);
    return this;
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }
  findAll(selector) {
    return $(this.$el.querySelectorAll(selector));
  }
  closest(value) {
    return $(this.$el.closest(value));
  }
  addClass(className) {
    this.$el.classList.add(className);
  }
  removeClass(className) {
    this.$el.classList.remove(className);
  }
  removeAllClass(className) {
    this.$el.forEach((el) => el.classList.remove(className));
  }
  contains(className) {
    return this.$el.classList.contains(className);
  }
  dataSet() {
    return this.$el.dataset;
  }
  value() {
    return this.$el.value;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes) => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
