import React from "react";
import { css, cx } from "emotion";

const styles = {
  select: css`
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
  `
};

const DropDown = ({
  items,
  innerRef,
  onChange,
  defaultSelectedItem,
  itemStyle,
  itemClassName,
  containerStyle,
  containerClassName
}) => (
  <select
    ref={innerRef}
    style={containerStyle}
    className={cx(styles.select, containerClassName)}
    value={defaultSelectedItem}
    onChange={onChange}
  >
    {items.map(item => (
      <option
        key={item.value}
        value={item.value}
        style={itemStyle}
        className={itemClassName}
      >
        {item.displayValue}
      </option>
    ))}
  </select>
);

export default DropDown;
