export function createNavbar(pageCount, pagintionSize, activePage = 1) {
  const countOfPage = Math.ceil(pageCount / pagintionSize);
  const pagination = [];

  for (let i = 0; i < countOfPage; i++) {
    const active = activePage === i + 1 ? 'active' : '';
    const number = `<span class="pagination-marker ${active}" data-pagination=${
      i + 1
    }>${i + 1}</span>`;
    pagination.push(number);
  }
  return `<div class="pagination">
  ${pagination.join('')}
</div>`;
}
