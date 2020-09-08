const checkStatus = (value) => {
  switch (value) {
    case 'in_stock':
      return 'В наличии';
    case 'pednding':
      return 'Ожидается';

    case 'out_of_stock':
      return 'Нет в наличии';

    default:
      return 'Статус';
  }
};

export { checkStatus };
