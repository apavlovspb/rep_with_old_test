let currentItem;
let position, inputPosition, startItem;
const separator = '_';
const textArea = document.querySelector('.textare-input');
const textAreaButton = document.querySelector('.textarea-button');

textAreaButton.addEventListener('click', () => {
  let myTransform = JSON.parse(textArea.value);
  drawSomeThing(myTransform);
  moveAll();
});

//draw Dom from json
function drawSomeThing(someThing) {
  const root = document.querySelector('.root');

  root.innerHTML = '';
  let dataSet = 'root';
  drawDom(someThing, root, dataSet);
}

function drawDom(itemForDraw, root, dataSet) {
  if (typeof itemForDraw !== 'object' || itemForDraw === null) {
    root.innerHTML = `<p>${itemForDraw}</p>`;
    root.dataset.myValueSet = dataSet;
    return;
  }
  const tag = Array.isArray(itemForDraw) ? 'ol' : 'ul';
  for (let item in itemForDraw) {
    let newDataSet = dataSet;
    const i = document.createElement(`${tag}`);
    i.classList.add('ul-element');
    root.append(i);
    newDataSet += `${separator}${item}`;
    i.dataset.myValueSet = newDataSet;
    drawDom(itemForDraw[item], i, newDataSet);
  }
}

//moveItems

function moveAll() {
  const arrayDnDElement = document.querySelectorAll('.ul-element');
  const root = document.querySelector('.root');
  root.addEventListener('dragenter', dragEnter);
  root.addEventListener('dragleave', dragLeave);
  root.addEventListener('dragover', dragOver);
  root.addEventListener('drop', dragDrop);
  arrayDnDElement.forEach((item) => {
    item.setAttribute('draggable', true);
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
  });
}

function changeSiblig(item, value) {
  let arr = value.split(`${separator}`);
  let next = item.nextElementSibling;
  if (next) {
    if (isNaN(arr[arr.length - 1])) {
      return;
    }
    let temp = item.nextElementSibling.dataset.myValueSet;
    item.nextElementSibling.dataset.myValueSet = value;

    changeSiblig(next, temp);
  }
}
/// DnDFunctions
function dragStart(e) {
  e.target.classList.add('ul-element-draggable');
  currentItem = e.target.cloneNode(true);
  position = e.target.dataset.myValueSet;
  startItem = e.target;
}
function dragEnd(e) {
  this.classList.remove('ul-element-draggable');
  //changeSiblig(e.target, e.target.dataset.myValueSet);
  //e.target.classList.add('hide');
  //e.target.remove();
}

function dragEnter(e) {
  e.target.classList.add('ul-element-dragenter');
  inputPosition =
    e.target.lastElementChild === null
      ? 'this_empty_array_or_obj'
      : e.target.lastElementChild.dataset.myValueSet;
}
function dragLeave(e) {
  e.target.classList.remove('ul-element-dragenter');
}
function dragOver(e) {
  e.preventDefault();
}

function dragDrop(e) {
  startItem.classList.add('hide');
  if (e.target.firstElementChild.tagName == 'P') {
    startItem.classList.remove('hide');
    console.log(startItem);
    e.target.classList.remove('ul-element-dragenter');
    console.log(e.target);
    return;
  }
  changeSiblig(startItem, startItem.dataset.myValueSet);
  e.target.classList.remove('ul-element-dragenter');
  e.target.append(currentItem);
  if (
    e.target.tagName == 'OL' &&
    inputPosition == 'this_empty_array_or_obj' &&
    currentItem.tagName == 'OL'
  ) {
    inputPosition = `${e.target.dataset.myValueSet}${separator}-1`;
    console.log('g');
  }
  currentItem.dataset.myValueSet = dynamicDrag(inputPosition, position);

  currentItem.classList.remove('ul-element-draggable');

  let newArea = createObject(document.querySelector('.root'));
  textArea.value = JSON.stringify(newArea);
  moveAll();
}

//dynamic DnD. change dataset
function dynamicDrag(newPos, oldPos) {
  console.log(inputPosition);
  let arrNewPos = newPos.split(`${separator}`);
  let nan = arrNewPos[arrNewPos.length - 1];
  if (isNaN(nan)) {
    let arrOldPos = oldPos.split(`${separator}`);
    let position = arrOldPos.join('.');
    return position;
  }
  arrNewPos[arrNewPos.length - 1] = +arrNewPos[arrNewPos.length - 1] + 1;
  let position = arrNewPos.join(`${separator}`);
  return position;
}

//new object create from DOM, need return obj

function createObject(parent) {
  const obj = deepCreateObject(parent);

  console.log(obj);
  return obj;
}

function deepCreateObject(inObject) {
  let outObject, value;
  if (!inObject.firstChild) {
    return null;
  }
  if (
    (inObject.tagName === 'UL' || inObject.tagName === 'OL') &&
    inObject.firstChild.tagName === 'P'
  ) {
    return inObject.firstChild.innerText;
  }
  if (inObject.tagName === 'UL' && inObject.firstChild.tagName === 'OL') {
    outObject = [];
  } else if (
    inObject.tagName === 'OL' &&
    inObject.firstChild.tagName === 'UL'
  ) {
    outObject = {};
  } else if (inObject.tagName === 'OL') {
    outObject = [];
  } else if (
    inObject.tagName === 'DIV' &&
    inObject.firstChild.tagName === 'UL'
  ) {
    outObject = {};
  } else if (inObject.tagName === 'UL') {
    outObject = {};
  }

  inObject.childNodes.forEach((item) => {
    value = item;
    let key = item.dataset.myValueSet;
    let keyArr = key.split(`${separator}`);
    key = keyArr.pop();
    outObject[key] = deepCreateObject(value);
  });

  return outObject;
}
