export class TableSelection {
  static selectedClass = 'selected';
  constructor() {
    this.group = [];
  }
  select($el) {
    if ($el.contains(TableSelection.selectedClass)) {
      this.clear();
      return;
    }
    this.clear();
    this.group.push($el);
    $el.addClass(TableSelection.selectedClass);
  }

  clear() {
    this.group.forEach((item) =>
      item.removeClass(TableSelection.selectedClass)
    );
    this.group = [];
  }
}
