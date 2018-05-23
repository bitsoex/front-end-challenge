import React from 'react'
import { connect } from 'react-redux'

const Ping = ({ isPinging, ping, sum }) => {
		console.log("component.render", isPinging, ping);
	return (
	  <div>
		<h1>is pinging: {isPinging.toString()}</h1>
		<span>{sum}</span>
		<button onClick={ping}>Start PING</button>
	  </div>	
	)
}

export default Ping;