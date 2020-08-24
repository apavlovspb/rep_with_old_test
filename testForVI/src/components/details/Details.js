import { FlexTableComponent } from '../../core/FlexTableComponent';
import { TableSelection } from '../table/TableSelection';
import { createDetails } from './datails.template';
import {
  changeTarget,
  dataLoading,
  downloadNewPage,
  searchPanelUpdate,
  newSort,
} from '../../core/Observer.events';

export class Details extends FlexTableComponent {
  constructor($root, options) {
    super($root, { name: 'Details', ...options });
  }
  static className = 'flextable__details';
  init() {
    super.init();
    this.subscribe(changeTarget, ($data) => {
      if ($data.contains(TableSelection.selectedClass)) {
        this.$root.html(createDetails($data, this.MAINARR.search()));
      } else {
        this.$root.html(createDetails(null, this.MAINARR.search()));
      }
    });
    this.subscribe(dataLoading, (data) => {
      this.$root.html(createDetails(null, null));
    });
    this.subscribe(downloadNewPage, (data) => {
      this.$root.html(createDetails(null, null));
    });
    this.subscribe(searchPanelUpdate, (data) => {
      this.$root.html(createDetails(null, null));
    });
    this.subscribe(newSort, (data) => {
      this.$root.html(createDetails(null, null));
    });
  }

  toHTML() {
    return createDetails();
  }
}
