import React from "react";
import Downshift from "downshift";
import { css, cx } from "emotion";

const styles = {
  flexCenter: css`
    display: flex;
    align-items: center;
  `,
  container: css`
    flex-direction: column;
  `,
  toggler: css`
    cursor: pointer;
    font-size: x-small;
  `
};

const DropDown = ({
  items,
  selectedItem,
  onChange,
  defaultSelectedItem,
  children
}) => (
  <Downshift defaultSelectedItem={defaultSelectedItem}>
    {({
      isOpen,
      getItemProps,
      selectedItem,
      highlightedIndex,
      getToggleButtonProps
    }) => (
      <div className={cx(styles.flexCenter, styles.container)}>
        <div
          {...getToggleButtonProps()}
          className={cx(styles.flexCenter, styles.toggler)}
        >
          {children(selectedItem)}
          <span>&nbsp; &#9660; &nbsp;</span>
        </div>
        {isOpen ? (
          <div style={{ border: "1px solid #ccc" }}>
            {items.map((item, index) => (
              <div
                {...getItemProps({ item })}
                key={item}
                style={{
                  backgroundColor:
                    highlightedIndex === index ? "gray" : "white",
                  fontWeight: selectedItem === item ? "bold" : "normal"
                }}
              >
                {item}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    )}
  </Downshift>
);
