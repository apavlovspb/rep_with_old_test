import React, { Component } from 'react';
import RadioList from './radioList';
import TextForm from './textForm';
import ItemList from './itemList';
import './inputForm.css';

class InputForm extends Component {
  state = {
    id: null,
    title: '',
    description: '',
    year: '',
    color: '',
    status: 'status',
    price: '',

    visibleList: false,
    activeList: '',
  };

  changeName = (e) => {
    this.setState({ title: e.target.value });
  };
  changeYear = (e) => {
    this.setState({ year: e.target.value });
  };
  changePrice = (e) => {
    this.setState({ price: e.target.value });
  };
  changeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  changeRatio = (value) => {
    this.setState({ color: value });
  };

  changeList = (e) => {
    this.setState({ status: e.target.dataset.value });
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState(() => {
        return {
          id: Math.floor(Math.random() * Math.random() * 10000000000),
        };
      });
    }
  }

  render() {
    return (
      <div className="wrapper-form wrapper">
        <h1 className="wrapper-form-title">¡Ay caramba!</h1>
        <div className="wrapper-form-content">
          <div className="wrapper-form-content-block">
            <TextForm
              changeValue={this.changeName}
              title={this.state.title}
              placeholder={'Название'}
              size={'wrapper-form-content-block-area'}
            />
            <TextForm
              changeValue={this.changeYear}
              title={this.state.year}
              placeholder={'Год'}
              size={'wrapper-form-content-block-area'}
            />
            <TextForm
              changeValue={this.changePrice}
              title={this.state.price}
              placeholder={'Цена'}
              size={'wrapper-form-content-block-area'}
            />
          </div>
          <TextForm
            changeValue={this.changeDescription}
            title={this.state.description}
            placeholder={'Описание'}
            size={'wrapper-form-content-area'}
          />
          <div className="wrapper-form-content-block">
            <RadioList
              changeColor={this.changeRatio}
              color={this.state.color}
            />
            <ItemList status={this.state.status} changeList={this.changeList} />
            <div
              className="wrapper-form-content-btn"
              onClick={() => {
                this.props.addElement(this.state);
                this.setState(() => {
                  return {
                    title: '',
                    description: '',
                    year: '',
                    color: '',
                    status: 'status',
                    price: '',
                    visibleList: false,
                    checked: false,
                  };
                });
              }}
            >
              Отправить >
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InputForm;
