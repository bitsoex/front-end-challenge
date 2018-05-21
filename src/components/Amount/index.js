import React, { Fragment } from "react";
import { colors } from "../../themes";

export default ({ amount }) => {
  let zeros = "";
  for (let i = amount.length - 1; i > 0; i--) {
    if (amount[i] !== "0") break;
    zeros += amount[i];
  }
  const amountNoEndingZeros = amount.substr(0, amount.length - zeros.length);
  return (
    <Fragment>
      {amountNoEndingZeros}
      <span style={{ color: colors.sidebar.text }}>{zeros}</span>
    </Fragment>
  );
};
