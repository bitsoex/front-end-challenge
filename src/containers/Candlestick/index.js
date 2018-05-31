import React, { Component } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import { fetchChartData } from "../../api";
import { colors } from "../../themes";
import { BookConsumer } from "../../context/Book";
// import Chart from "../../components/Candlestick";
import Chart from "../../components/Candlestick2";

export default () => (
  <BookConsumer>
    {({ book }) => <ChartContainer book={book.book} />}
  </BookConsumer>
);

class ChartContainer extends Component {
  static propTypes = {
    book: PropTypes.string.isRequired
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
    const { book } = this.props;
    if (book !== prevProps.book) {
      this.fetchData(book);
    }
  }

  fetchData = async book => {
    this.setState({ loading: true });
    const data = await fetchChartData({ book });
    const mappedData = data
      .map(this.dataMapperFormat)
      .map(this.dataMapperValues);
    this.setState({ loading: false, data: mappedData });
  };

  dataMapperFormat = d => ({
    date: dayjs(d.date),
    x: dayjs(d.date).valueOf(),
    high: +d.high,
    open: +d.open,
    close: +d.close,
    low: +d.low
  });

  dataMapperValues = d => ({
    ...d,
    y: (d.open - d.close) * 2,
    opacity: 0.7,
    stroke: d.open > d.close ? colors.green.medium : colors.red.medium,
    color: d.open > d.close ? colors.green.dark : colors.red.dark
  });

  getHighAndLow = (data = []) => {
    const lowValues = data.map(d => d.low);
    const highValues = data.map(d => d.high);
    const lowest = Math.min(...lowValues);
    const highest = Math.max(...highValues);

    const min = Math.floor(lowest / 5000) * 5000; // floor to the closest 5000
    const max = Math.ceil(highest / 5000) * 5000; // ceil to the closest 5000

    return { min, max };
  };

  render() {
    const { loading } = this.state;
    if (loading) return <div>Loading...</div>;

    const { data } = this.state;

    const { min, max } = this.getHighAndLow(data);

    return <Chart data={data} yDomain={[min, max]} />;
  }
}
