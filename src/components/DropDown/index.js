import React, { Component } from "react";
import { css, cx } from "emotion";

const styles = {
  select: css`
    background: transparent;
    border: none;
    cursor: pointer;
  `
};

const DropDown = ({
  items,
  selectedItem,
  itemStyle,
  itemClassName,
  containerStyle,
  containerClassName
}) => (
  <select
    style={containerStyle}
    className={cx(styles.select, containerClassName)}
  >
    {items.map(item => (
      <option
        value={item}
        selected={item === selectedItem}
        style={itemStyle}
        className={itemClassName}
      >
        {item}
      </option>
    ))}
  </select>
);

export default DropDown;
