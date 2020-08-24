import { FlexTableComponent } from '../../core/FlexTableComponent';
import { createNavbar } from './navbar.template';
import { $ } from '../../core/dom';
import {
  searchPanelUpdate,
  dataLoading,
  arrayFinished,
  downloadNewPage,
} from '../../core/Observer.events';
import { checkDataSet } from '../../core/utils';

export class Navbar extends FlexTableComponent {
  static className = 'flextable__navbar';
  constructor($root, options) {
    super($root, {
      name: 'Navbar',
      listeners: ['click'],
      ...options,
    });
  }
  toHTML() {
    return ``;
  }

  init() {
    super.init();
    this.subscribe(dataLoading, () => {
      this.$root.addClass('delete');
    });
    this.subscribe(arrayFinished, ($data) => {
      this.$root.removeClass('delete');
      return this.$root.html(
        createNavbar(
          $data.countElement($data.getCurrentArray()),
          $data.getPaginationSize(),
          $data.getPage()
        )
      );
    });
    this.subscribe(searchPanelUpdate, ($data) => {
      return this.$root.html(
        createNavbar(
          $data.countElement($data.getCurrentArray()),
          $data.getPaginationSize(),
          $data.getPage()
        )
      );
    });
  }
  onClick(e) {
    if (!checkDataSet(e, 'pagination')) {
      return;
    }
    const paginationPage = this.$root.findAll('[data-pagination]');
    paginationPage.removeAllClass('active');
    const $target = $(e.target);
    $target.addClass('active');
    this.MAINARR.changePage(checkDataSet(e, 'pagination'));
    this.trigger(downloadNewPage, checkDataSet(e, 'pagination'));
  }
}
