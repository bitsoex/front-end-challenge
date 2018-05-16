import React from "react";
import icon_candles from "../assets/Images/SVG/icon_candles.svg";
import icon_deep from "../assets/Images/SVG/icon_deep.svg";

class ChartBar extends React.Component {
  renderIcon = () => {
    const { currentChart } = this.props;
    if (currentChart === "candles") {
      return <img src={icon_deep} alt="deep" className="chart-toggle-image" />;
    }

    return (
      <img src={icon_candles} alt="candles" className="chart-toggle-image" />
    );
  };

  render() {
    const { toggleChart } = this.props;
    return (
      <div className="chart-bar-container">
        <button className="chart-toggle-button" onClick={toggleChart}>
          {this.renderIcon()}
        </button>
      </div>
    );
  }
}

export default ChartBar;
