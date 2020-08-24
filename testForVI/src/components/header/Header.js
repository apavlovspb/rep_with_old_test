import { FlexTableComponent } from '../../core/FlexTableComponent';
import {
  dataLoaded,
  dataLoading,
  arrayOpened,
  searchPanelStart,
  serverError,
} from '../../core/Observer.events';
import { checkDataSet } from '../../core/utils';

export class Header extends FlexTableComponent {
  static className = 'flextable__header';
  constructor($root, options) {
    super($root, { name: 'Header', listeners: ['click'], ...options });
    this.searchValue = [];
  }
  toHTML() {
    return ` 
    <div class="header-left hide" data-search="header">
    <input data-search="value" type="text" class="input" value="" />
    <div class="button" data-search="button">
      <span class="material-icons" data-search="button">
        search
      </span>
    </div>
  </div>
  <div class="header-right">
    <div class="button" data-button="shortver">
      short-version
    </div>
    <div class="button" data-button="longver">
      full-version
    </div>
  </div>
  `;
  }

  onClick(event) {
    if (
      checkDataSet(event, 'button') === 'shortver' ||
      checkDataSet(event, 'button') === 'longver'
    ) {
      const dataSize = checkDataSet(event, 'button');
      this.$root.findAll('[data-button]').removeAllClass('active');
      this.$root.find(`[data-button="${dataSize}"]`).addClass('active');
      this.apiService
        .getTable(dataSize)
        .then((value) => {
          this.MAINARR.changeData(value);
          this.trigger(arrayOpened, this.MAINARR);
          this.trigger(dataLoaded, null);
          this.$root.find(`[data-search="header"]`).removeClass('hide');
        })
        .catch((e) => this.trigger(serverError, e));
      this.trigger(dataLoading, null);
    }
    if (checkDataSet(event, 'search') === 'button') {
      const $value = this.$root.find(`[data-search="value"]`);
      this.MAINARR.changeSearchValue($value.value());
      this.trigger(searchPanelStart, this.MAINARR);
    }
  }
}
