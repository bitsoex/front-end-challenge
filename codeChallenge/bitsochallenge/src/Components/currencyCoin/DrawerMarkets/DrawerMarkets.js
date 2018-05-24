import React, { Component }  from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class DrawerMarkets extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
        <RaisedButton
          label="Markets"
          onClick={this.handleToggle}
        />
        <Drawer
          openSecondary={true}
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onClick={this.handleClose}>BTC/MXN</MenuItem>
          <MenuItem onClick={this.handleClose}>ETH/MXN</MenuItem>
        </Drawer>
      </div>
    );
  }
}
export default  DrawerMarkets;
