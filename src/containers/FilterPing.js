import { connect } from 'react-redux'
import Ping from '../components/Ping'


const PING = 'PING';
const PONG = 'PONG';

const ping = () => {
	console.log("connect.method.ping FilterPing");
	return ({ type: PING, sum: 0 })
};

export default connect(
  ({ isPinging, sum }) => ({ isPinging, sum }),
  { ping }
)(Ping);