import React, { Component } from 'react';
import './table.css';
import TableItem from '../table-item';

class Table extends Component {
  deleteItems = (id) => {
    this.props.deleteElement(id);
  };
  renderItems(arr) {
    return arr.map((car) => {
      return (
        <TableItem key={car.id} car={car} deleteItems={this.deleteItems} />
      );
    });
  }

  render() {
    return (
      <div className="wrapper wrapper-table ">
        <div className="wrapper-table-title">АВТОМОБИЛИ В НАЛИЧИИ</div>
        <div className="wrapper-table-header row">
          <div className="wrapper-table-header-name cell_1">Название</div>
          <div className="wrapper-table-header-year cell_2">Год</div>
          <div className="wrapper-table-header-color cell_3">Цвет</div>
          <div className="wrapper-table-header-status cell_4">Статус</div>
          <div className="wrapper-table-header-cost cell_5">Цена</div>
          <div className="wrapper-table-header-button cell_6">
            <button className="btn btn-delete cell hidden">Удалить</button>
          </div>
        </div>

        {this.renderItems(this.props.carList)}
      </div>
    );
  }
}

export default Table;
