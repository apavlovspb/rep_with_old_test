export function capitalize(str) {
  if (typeof str !== 'string') {
    return ``;
  }
  return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}

export function checkDataSet(event, data) {
  return event.target.dataset[data];
}
