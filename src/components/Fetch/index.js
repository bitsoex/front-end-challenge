import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Fetch extends Component {
  static propTypes = {
    promise: PropTypes.instanceOf(Promise).isRequired
  };

  state = { loading: true, data: null };

  getPromiseResult = async () => {
    const { promise } = this.props;
    const data = await promise();
    this.setState({ data, loading: false });
  };

  componentDidMount() {
    this.getPromiseResult();
  }

  render() {
    const { loading } = this.state;

    if (loading) return <div>Loading...</div>;

    const { data } = this.state;

    return this.props.children({ data });
  }
}
