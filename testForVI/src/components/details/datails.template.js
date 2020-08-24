export function createDetails(data, array) {
  if (!data) {
    return ``;
  }
  const dataCell = [];
  data.findAll(`[data-col]`).$el.forEach((el) => dataCell.push(el.innerText));
  const details = takeDetails(dataCell, array);

  const {
    description,
    firstName,
    lastName,
    adress: { streetAddress, zip, state, city },
  } = details[0];
  return `
  <div>
   <div>Выбран пользователь <b>${firstName} ${lastName}</b></div>
          <div>
            Описание: ${description}
          </div>
          <div>Адрес проживания: <b>${streetAddress}</b></div>
          <div>
            Город:
            <b>${city}</b>
          </div>
          <div>Провинция/штат: <b>${state}</b></div>
          <div>Индекс: <b>${zip}</b></div>
   </div>
    `;
}
function takeDetails(value, array) {
  const filter = array.filter((el) => {
    return (
      el.id === +value[0] &&
      el.firstName === value[1] &&
      el.lastName === value[2]
    );
  });
  return filter;
}
