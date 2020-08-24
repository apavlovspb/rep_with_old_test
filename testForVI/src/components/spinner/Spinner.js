import { FlexTableComponent } from '../../core/FlexTableComponent';
import {
  dataLoading,
  dataLoaded,
  serverError,
} from '../../core/Observer.events';
import { createSpinner } from './spinner.template';
export class Spinner extends FlexTableComponent {
  static className = 'flextable__spinner';
  constructor($root, options) {
    super($root, {
      name: 'Spinner',
      listeners: [],
      ...options,
    });
  }

  toHTML() {
    this.$root.addClass('delete');
    return this.$root.html(createSpinner(true));
  }
  init() {
    super.init();
    this.subscribe(dataLoading, () => {
      this.$root.html(createSpinner(true));
      this.$root.removeClass('delete');
    });
    this.subscribe(dataLoaded, () => {
      this.$root.addClass('delete');
      this.$root.html(createSpinner(``));
    });
    this.subscribe(serverError, (e) => {
      this.$root.addClass('delete');
      this.$root.html(createSpinner(``));
    });
  }
}
