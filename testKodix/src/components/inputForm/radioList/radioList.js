import React, { Component } from 'react';

const color1 = 'white';
const color2 = 'black';
const color3 = 'grey';
const color4 = 'red';
const color5 = 'green';

const RADIO = ({
  id = 'color-1',
  name = 'color',
  value = 'white',
  active = '',
}) => {
  return (
    <div className="radio">
      <input
        className="custom-radio hidden"
        type="radio"
        id={id}
        name={name}
        value={value}
      />
      <label htmlFor={id} className={`label-radio ${value} ${active}`}></label>
    </div>
  );
};

class RadioList extends Component {
  changeRatio = (e) => {
    this.props.changeColor(e.target.value);
  };

  render() {
    const { color } = this.props;
    return (
      <div className="wrapper-form-content-ratio">
        <div className="wrapper-form-content-ratio-title">Цвет</div>
        <form
          className="wrapper-form-content-ratioblock"
          onChange={this.changeRatio}
        >
          <RADIO
            id={'color-1'}
            name={'color'}
            value={color1}
            active={color === color1 ? 'active' : ''}
          />
          <RADIO
            id={'color-2'}
            name={'color'}
            value={color2}
            active={color === color2 ? 'active' : ''}
          />
          <RADIO
            id={'color-3'}
            name={'color'}
            value={color3}
            active={color === color3 ? 'active' : ''}
          />
          <RADIO
            id={'color-4'}
            name={'color'}
            value={color4}
            active={color === color4 ? 'active' : ''}
          />
          <RADIO
            id={'color-5'}
            name={'color'}
            value={color5}
            active={color === color5 ? 'active' : ''}
          />
        </form>
      </div>
    );
  }
}
export default RadioList;
