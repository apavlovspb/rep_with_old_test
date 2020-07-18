// let currentListItem = {
//   ship: 'корабль',
//   dog: 'собака',
//   cat: 'кошка',
//   phone: 'телефон',
//   bible: 'библия',
// };

let currentListItem = localStorage.getItem('value') ? getLocalValue() : [];

let lang = 0;
let currentNumber = 0;

//отрисовка случайного элемента
const drawRandomChar = (lang, arr) => {
  const outputChar = document.querySelector('.main-block_questions');
  outputChar.innerHTML = getRandomChar(lang, arr);
};
// получеение случайного элемента масиива
const getRandomChar = (lang, arr) => {
  if (arr.length == 0) {
    return 'Нужно добавить первое слово';
  }
  console.log(lang, arr);
  currentNumber = Math.floor(Math.random() * arr.length);
  const p = arr[currentNumber][lang];
  return p;
};
//сбор инпута от пользователя
const takeInput = () => {
  const inputChar = document.querySelector('.main-block_input');
  const input = inputChar.value;
  inputChar.value = '';
  console.log(input);
  return input;
};

// оценка результата, сравнение инпута и данных
const compareResult = (lang, arr) => {
  if (!arr.length) {
    document.querySelector('.main-block_text').innerHTML = 'add new item';
  }
  console.log(arr[currentNumber][1]);
  if (takeInput() == arr[currentNumber][1]) {
    drawResult(1);
  } else {
    drawResult(0);
  }
  drawRandomChar(lang, arr);
};
// отрисовка результата победы
const drawResult = (arg) => {
  let result = '';
  if (arg) {
    result = 'win';
  } else {
    result = 'lose';
  }
  document.querySelector('.main-block_text').innerHTML = result;
};
// добавление нового элемента с список
const addNewItem = (arr) => {
  const endValue = document.querySelector('.add__new-eng').value;
  const ruValue = document.querySelector('.add__new-ru').value;
  const tempItem = [endValue, ruValue];
  document.querySelector('.add__new-eng').value = '';
  document.querySelector('.add__new-ru').value = '';
  arr.push(tempItem);
  setLocalValue(arr);
  console.log(arr);
};

// Текущий список слов
const itemList = document.querySelector('.current__item-list');
const showMeAllItem = (arr, position) => {
  itemList.classList.toggle('hidden');
  //document.body.style.overflow = 'hidden';
  position.innerHTML = '';
  const showMyArr = document.createElement('ul');
  const divForAll = document.createElement('div');
  const closeDiv = document.createElement('div');
  const closeBtn = document.createElement('button');
  closeDiv.classList.add('div__new_closebtn');
  closeDiv.appendChild(closeBtn);
  closeBtn.classList.add('btn');
  closeBtn.classList.add('li__new_closebtn');
  closeBtn.innerHTML = 'X';
  divForAll.appendChild(closeDiv);
  divForAll.appendChild(showMyArr);
  divForAll.classList.add('temp_ul');
  showMyArr.classList.add('main-ul');
  if (!arr.length) {
    showMyArr.innerHTML = 'add new item';
    position.appendChild(divForAll);
    return;
  }
  arr.forEach((i, index) => {
    const element = document.createElement('li');
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'delete';
    element.classList.add('temp-li');
    element.innerHTML = `<p>${index + 1}</p>
    <p>${i[0]}</p> <p>${i[1]}</p>
    `;
    element.appendChild(deleteButton);
    showMyArr.appendChild(element);
  });
  position.appendChild(divForAll);
};

itemList.addEventListener('click', (e) => {
  if (e.target === itemList) {
    itemList.classList.toggle('hidden');
    // document.body.style.overflow = '';
  }
});

// document.querySelector('.header-navbar_new').addEventListener('click', () => {
//   document.querySelector('.add__new').classList.toggle('hidden');
// });

document
  .querySelector('.add__new_btn')
  .addEventListener('click', () => addNewItem(currentListItem));

drawRandomChar(lang, currentListItem);

document
  .querySelector('.main-block_btn')
  .addEventListener('click', () => compareResult(lang, currentListItem));

itemList.addEventListener('click', (e) => {
  console.log(e.target.tagName);
  if (e.target.tagName !== 'BUTTON') {
    return;
  }
  const p = e.target.parentElement.firstChild.innerText;
  console.log(+p);
  currentListItem.splice(p - 1, 1);
  showMeAllItem(currentListItem, itemList);
  setLocalValue(currentListItem);
});

document
  .querySelector('.header-navbar_current')
  .addEventListener('click', () => {
    showMeAllItem(currentListItem, itemList);
  });

//modal window
const modalTrigger = document.querySelector('.header-navbar_new');
const modal = document.querySelector('.add__new');
const modalCloseBtn = document.querySelector('.add__new_closebtn');
modalTrigger.addEventListener('click', () => {
  modal.classList.toggle('hidden');
  document.body.style.overflow = 'hidden';
});
modalCloseBtn.addEventListener('click', () => {
  modal.classList.toggle('hidden');
  document.body.style.overflow = '';
});
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.toggle('hidden');
    document.body.style.overflow = '';
  }
});

//localstorage
function arrayToString(arr) {
  let a = arr.map((item) => {
    let t = item.join('+');
    return t;
  });
  let p = a.join(';');
  return p;
}

function setLocalValue(arr) {
  localStorage.setItem('value', arrayToString(arr));
}
// setLocalValue(currentListItem);

function getLocalValue() {
  let local = localStorage.getItem('value');
  if (!local) {
    return;
  }
  let p = local.split(';');
  let s = p.map((item) => item.split('+'));
  console.log(s);
  return s;
}
// getLocalValue();
