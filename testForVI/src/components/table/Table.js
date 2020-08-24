import { FlexTableComponent } from '../../core/FlexTableComponent';
import { __sortZA, __sortAZ } from '../../core/Data';
// import { createTable } from './table.template';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';
import { $ } from '@core/dom';
import {
  dataLoading,
  arrayOpened,
  searchPanelStart,
  searchPanelUpdate,
  arrayFinished,
  downloadNewPage,
  changeTarget,
  serverError,
  newSort,
} from '../../core/Observer.events';
import { checkDataSet } from '../../core/utils';
const __startPage = 1;
export class Table extends FlexTableComponent {
  static className = 'flextable__table';
  constructor($root, options) {
    super($root, { name: 'Table', listeners: ['click'], ...options });
  }
  toHTML() {
    return ``;
  }
  prepare() {
    this.selection = new TableSelection();
  }
  init() {
    super.init();
    this.subscribe(serverError, (e) => {
      console.log(e);
      this.$root.removeClass('delete');
      this.$root.html('<h1>Server not found, please try again later</h1>');
    });
    this.subscribe(dataLoading, () => {
      this.$root.addClass('delete');
    });
    this.subscribe(arrayOpened, ($data) => {
      this.$root.removeClass('delete');
      $data.changePage(__startPage);
      const table = this.$root.html(
        createTable($data.search(), this.MAINARR.getType())
      );
      this.trigger(arrayFinished, $data);
      return table;
    });
    this.subscribe(searchPanelStart, ($data) => {
      $data.changePage(__startPage);
      const table = this.$root.html(
        createTable($data.search(), this.MAINARR.getType())
      );
      this.trigger(searchPanelUpdate, $data);
      return table;
    });
    this.subscribe(downloadNewPage, (value) => {
      return this.$root.html(
        createTable(this.MAINARR.search(), this.MAINARR.getType())
      );
    });
  }
  onClick(event) {
    if (checkDataSet(event, 'type') === 'cell') {
      const $target = $(event.target);
      const $parent = $target.closest(`[data-row]`);
      this.selection.select($parent);
      this.trigger(changeTarget, $parent);
    }
    if (checkDataSet(event, 'field')) {
      checkDataSet(event, 'type') === __sortAZ
        ? (event.target.dataset.type = __sortZA)
        : (event.target.dataset.type = __sortAZ);
      this.trigger(newSort, null);
      this.MAINARR.changeSortParameters(
        checkDataSet(event, 'field'),
        checkDataSet(event, 'type')
      );
      return this.$root.html(
        createTable(this.MAINARR.search(), this.MAINARR.getType())
      );
    }
  }
}
