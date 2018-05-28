import React, { Component } from "react";
import PropTypes from "prop-types";
import { BookConsumer } from "../../context/Book";

export default class Fetch extends Component {
  static propTypes = {
    defaultValue: PropTypes.any,
    promise: PropTypes.instanceOf(Promise).isRequired
  };

  static defaultProps = {
    defaultValue: null
  };

  state = {
    loading: true,
    data: this.props.defaultValue
  };

  getPromiseResult = async () => {
    this.setState({ loading: true });
    const data = await this.props.promise();
    this.setState({ data, loading: false });
  };

  render() {
    const { loading } = this.state;

    if (loading) return <div>Loading...</div>;

    this.getPromiseResult();

    const { data } = this.state;

    return this.props.children({ data });

    return (
      <BookConsumer>{({ book }) => this.props.children({ data })}</BookConsumer>
    );
  }
}
