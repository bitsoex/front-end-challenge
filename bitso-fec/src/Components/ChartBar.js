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
    const {
      currentChart,
      toggleChart,
      timeframe,
      onChangeTimeframe
    } = this.props;
    return (
      <div className="chart-bar-container">
        <div className="chart-bar-left">
          <button className="chart-toggle-button" onClick={toggleChart}>
            {this.renderIcon()}
          </button>
          {currentChart !== "candles" ? null : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "8rem"
              }}
            >
              <span style={{ color: "var(--light-text)", fontSize: "1.4rem" }}>
                Periodo
              </span>
              <div className="chart-bar-select-div">
                <select
                  defaultValue={timeframe}
                  className="chart-bar-filter-select"
                  onChange={e => onChangeTimeframe(e.target.value)}
                >
                  <option value="1month">1 mes</option>
                  <option value="3months">3 meses</option>
                  <option value="1year">1 año</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="chart-bar-right">
          {currentChart !== "candles" ? (
            <span>Spread Zoom</span>
          ) : (
            <span>Candles Zoom</span>
          )}
        </div>
      </div>
    );
  }
}

export default ChartBar;
