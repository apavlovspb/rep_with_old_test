export const __sortAZ = 'AZ';
export const __sortZA = 'ZA';

const gimmeValue = (filter, key) => {
  if (typeof key !== 'object') {
    const result = String(key).toLowerCase().includes(filter.toLowerCase());
    return result;
  }
};

const sortAZ = (arr, key) => {
  arr.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });
};
const sortZA = (arr, key) => {
  arr.sort((a, b) => {
    if (a[key] > b[key]) {
      return -1;
    }
    if (a[key] < b[key]) {
      return 1;
    }
    return 0;
  });
};

export class DataCenter {
  constructor() {
    this.mainData = [];
    this.__paginstionSize = 50;
    this.currentArr = [];
    this.searchValue = '';
    this.sortField = '';
    this.sortType = '';
    this.currentPage = 1;
  }
  changeSearchValue(value) {
    this.searchValue = value.trim();
  }

  changeData(arr) {
    this.mainData = [...arr];
  }
  currentData(currentArr = this.mainData) {
    if (currentArr.length > this.__paginstionSize) {
      const start = (this.currentPage - 1) * this.__paginstionSize;
      const end = start + this.__paginstionSize;
      return currentArr.slice(start, end);
    }
    return currentArr;
  }

  countElement(currentArr = this.mainData) {
    return currentArr.length;
  }
  getPaginationSize() {
    return this.__paginstionSize;
  }
  search(filter = this.searchValue) {
    if (filter === '') {
      this.currentArr = [...this.mainData];
      this.sort();
      return this.currentData(this.currentArr);
    }
    this.currentArr = this.mainData.filter((elem) => {
      const keys = Object.values(elem).slice(0, 5);
      const arr = keys.map((key) => gimmeValue(filter, key));
      return arr.indexOf(true) > -1;
    });
    this.sort();
    return this.currentData(this.currentArr);
  }
  changeSortParameters(field, type) {
    this.sortType = type;
    this.sortField = field;
  }
  changePage(page) {
    this.currentPage = page;
  }
  sort() {
    if (this.sortType === __sortAZ) {
      return sortAZ(this.currentArr, this.sortField);
    } else if (this.sortType === __sortZA) {
      return sortZA(this.currentArr, this.sortField);
    }
  }
  getType() {
    return { type: this.sortType, field: this.sortField };
  }
  getPage() {
    return this.currentPage;
  }

  getCurrentArray() {
    return this.currentArr;
  }
}
