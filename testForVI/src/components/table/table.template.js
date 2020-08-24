export function createTable(arr, options = {}) {
  const _colCount = 5;
  const _colHeader = ['id', 'firstName', 'lastName', 'email', 'phone'];
  const rows = [];
  const rowsCount = arr.length;

  const cols = new Array(_colCount)
    .fill('')
    .map((el, index) => {
      return _colHeader[index];
    })
    .map((el, ind) => createCol(el, ind, options))
    .join('');

  rows.push(createRow('main', cols));
  for (let i = 0; i < rowsCount; i++) {
    const cells = Object.values(arr[i])
      .splice(0, 5)
      .map((el, col) => createCell(el, col, i))
      .join('');
    rows.push(createRow(i, cells));
  }

  return rows.join('');
}
function createArrow(type, field, currentField) {
  if (field === currentField) {
    if (type === 'AZ') {
      return 'vertical_align_bottom';
    } else if (type === 'ZA') {
      return 'vertical_align_top';
    }
  } else {
    return ` `;
  }
}

function createCol(el, index, options) {
  const { type = '', field = '' } = options;
  const arrow = createArrow(type, field, el);
  return `
  <div class="column" data-field="${el}" data-type="${type}" data-col="${index}" >
      ${el}
      <span class="material-icons" data-field="${el}" data-type="${type}">
        ${arrow}
      </span>
  </div>
  `;
}

function createCell(el, col, row) {
  return `
  <div class="cell" 
  data-col=${col}  data-id="${row}:${col}" data-type="cell">${el}</div>
  `;
}

function createRow(row, content) {
  return `
  <div class="row" >
      <div class="row-data" data-row=${row}>${content}</div>
   </div>
  `;
}
