import React, {Component} from 'react'
import { Header } from '../../Components'
import '../../Statics/css/Home.css'
import { Link } from 'react-router-dom'
import Particles from 'react-particles-js'

export default class Home extends Component {
    render(){
        return(
            <div>
                <Header />
                <div class='bodyHome' >
                    <h1>Welcome To Font-End Chalenge</h1>
                    <ul>
                        <li><Link to='/' >Home</Link></li>
                        <li><Link to='/test' >Test</Link></li>
                    </ul>
                </div>

                <div class='little'>
                <Particles params={{
                                particles: {
                                    number: {
                                        value: 100
                                    },
                                    line_linked: {
                                        distance: 200,
                                        shadow: {
                                            enable: false,
                                            color: "#fffff",
                                            blur: 5
                                        }
                                    }
                                }
                            }}
                            style={{
                                position: "fixed",
                                top: 1,
                                left: 0,
                                width: "200%",
                                height: "200%"
                            }}/>
                </div>
            </div>       
        );
    }
}