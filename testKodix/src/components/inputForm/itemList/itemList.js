import React from 'react';
import './itemList.css';
import { checkStatus } from '../../../utilites/utils';
const ItemList = ({ status = 'status', changeList = () => {} }) => {
  let value = checkStatus(status);

  return (
    <div className="wrapper-form-content-list">
      {value}
      <ul className="wrapper-form-content-list-head">
        <li
          className="wrapper-form-content-list-content"
          data-value="in_stock"
          onClick={changeList}
        >
          В наличии
        </li>
        <li
          className="wrapper-form-content-list-content"
          data-value="pednding"
          onClick={changeList}
        >
          Ожидается
        </li>
        <li
          className="wrapper-form-content-list-content"
          data-value="out_of_stock"
          onClick={changeList}
        >
          Нет в наличии
        </li>
      </ul>
    </div>
  );
};
export default ItemList;
