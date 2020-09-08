import React, { Component } from 'react';
import Header from '../header';
import Table from '../table';
import InputForm from '../inputForm';
import './app.css';
import GetResource from '../../service/getResource';

export default class App extends Component {
  getResource = new GetResource();

  state = {
    cars: [],
  };

  componentDidMount() {
    this.initbase();
  }

  deleteElement = (id) => {
    const element = this.state.cars.findIndex((elem) => {
      return elem.id === id;
    });

    this.setState(() => {
      return {
        cars: [
          ...this.state.cars.slice(0, element),
          ...this.state.cars.slice(element + 1),
        ],
      };
    });
  };

  addElement = (element) => {
    this.setState({
      cars: [...this.state.cars, element],
    });
  };

  initbase = () => {
    this.getResource.getResource().then((data) => {
      this.setState({
        cars: data,
      });
    });
  };
  render() {
    return (
      <React.Fragment>
        <Header />
        <InputForm addElement={this.addElement} />
        <Table carList={this.state.cars} deleteElement={this.deleteElement} />
      </React.Fragment>
    );
  }
}
