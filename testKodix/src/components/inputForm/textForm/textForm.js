import React from 'react';

const TextForm = ({
  title,
  changeValue,
  placeholder = 'temp',
  size = 'wrapper-form-content-block-area',
}) => {
  return (
    <div className={size}>
      <input
        className="input-area input-area-name"
        type="text"
        placeholder={placeholder}
        onChange={changeValue}
        value={title}
      />
    </div>
  );
};

export default TextForm;
