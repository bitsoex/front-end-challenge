import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { css, cx } from "emotion";
import DropDown from "../../components/DropDown";

const styles = {
  bookSelector: css`
    color: #98d372;
  `
};

export default class ChartToolbar extends Component {
  static propTypes = {
    timeFrames: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  items = this.props.timeFrames.map(timeFrame => ({
    value: timeFrame,
    displayValue: `${timeFrame.substr(0, 1)} ${timeFrame.substr(1)}`
  }));

  state = {
    timeFrame: this.props.timeFrames[0],
    chartType: "candlestick"
  };

  handleTimeFrameChange = e => {
    const { timeFrames } = this.props;
    const timeFrame = e.target.value;
    const index = timeFrames.indexOf(timeFrame);
    this.setState({
      timeFrame: timeFrames[index]
    });
  };

  render() {
    const { timeFrame } = this.state;
    return (
      <Fragment>
        <DropDown
          containerClassName={cx(styles.bookSelector)}
          items={this.items}
          onChange={this.handleTimeFrameChange}
        />
        {this.props.children({ timeFrame })}
      </Fragment>
    );
  }
}
