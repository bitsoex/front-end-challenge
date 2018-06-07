import React, { Component } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import { fetchChartData } from "../../api";
import { BookConsumer } from "../../context/Book";
import Chart from "../../components/Candlestick";
import ChartToolbar from "../../components/Candlestick/Toolbar";

const timeFrames = ["1month", "3months", "1year"];

export default () => (
  <BookConsumer>
    {({ book }) => (
      <ChartToolbar timeFrames={timeFrames}>
        {({ timeFrame }) => (
          <ChartContainer book={book.book} timeFrame={timeFrame} />
        )}
      </ChartToolbar>
    )}
  </BookConsumer>
);

class ChartContainer extends Component {
  static propTypes = {
    book: PropTypes.string.isRequired,
    timeFrame: PropTypes.string.isRequired
  };

  static defaultProps = {
    timeFrame: timeFrames[0]
  };

  state = {
    data: [],
    loading: true
  };

  componentDidMount() {
    const { book } = this.props;
    this.fetchData(book);
  }

  componentDidUpdate(prevProps) {
    const { book, timeFrame } = this.props;
    if (book !== prevProps.book || timeFrame !== prevProps.timeFrame) {
      this.fetchData(book);
    }
  }

  fetchData = async book => {
    this.setState({ loading: true });
    const { timeFrame } = this.props;
    const data = await fetchChartData({ book, timeFrame });
    const mappedData = data
      .map(this.convertValuesMapper)
      .map(this.xyValuesMapper);
    this.setState({ loading: false, data: mappedData });
  };

  convertValuesMapper = d => ({
    date: dayjs(d.date),
    high: +d.high,
    open: +d.open,
    close: +d.close,
    low: +d.low,
    volume: +d.volume,
    value: +d.value,
    vwap: +d.vwap
  });

  xyValuesMapper = d => ({
    ...d,
    x: dayjs(d.date).valueOf(),
    y: (d.open - d.close) * 2
  });

  render() {
    const { loading } = this.state;

    const { book } = this.props;
    const { data } = this.state;

    return <Chart book={book} data={data} />;
  }
}
