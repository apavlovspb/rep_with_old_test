import { $ } from '@core/dom';
import { Observer } from '../../core/Observer';
import { DataCenter } from '../../core/Data';
import { ApiService } from '../../core/getResource';

export class FlexTable {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.observer = new Observer();
    this.MAINARR = new DataCenter();
    this.apiService = new ApiService();
  }

  getRoot() {
    const $root = $.create('div', 'flextable');
    const options = {
      observer: this.observer,
      mainArray: this.MAINARR,
      apiService: this.apiService,
    };
    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, options);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }
  render() {
    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }
}
