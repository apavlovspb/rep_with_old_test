import { checkStatus } from '../../utilites/utils';
import React, { Component } from 'react';
import './table-item.css';
class TableItem extends Component {
  state = {
    description: null,
    name: null,
    year: null,
    color: null,
    status: null,
    cost: null,
    id: null,
  };

  componentDidMount() {
    this.initElement();
  }
  componentDidUpdate(prevProps) {
    if (this.props.car !== prevProps.car) {
      this.initElement();
    }
  }

  initElement = () => {
    if (!this.props) {
      return <h1>none</h1>;
    }

    this.setState({
      name: this.props.car.title,
      year: this.props.car.year,
      description: this.props.car.description,
      color: this.props.car.color,
      cost: this.props.car.price,
      status: this.props.car.status,
      id: this.props.car.id,
    });
  };

  render() {
    const statusText = checkStatus(this.state.status);
    return (
      <div key={this.state.id} className="wrapper-table-content row">
        <div className="wrapper-table-content-name cell_1">
          {this.state.name}
        </div>
        <div className="wrapper-table-content-description cell_7">
          {this.state.description}
        </div>
        <div className="wrapper-table-content-year cell_2">
          {this.state.year}
        </div>
        <div className="wrapper-table-content-color cell_3">
          <div className={`label-radio ${this.state.color}`}></div>
        </div>
        <div className="wrapper-table-content-status cell_4">{statusText}</div>
        <div className="wrapper-table-content-cost cell_5">
          {this.state.cost} руб.
        </div>
        <div className="wrapper-table-content-button cell_6">
          <button
            className="btn btn-delete cell"
            onClick={() => this.props.deleteItems(this.state.id)}
          >
            Удалить
          </button>
        </div>
      </div>
    );
  }
}

export default TableItem;
