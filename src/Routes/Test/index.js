import React, {Component} from 'react'
import { Header } from '../../Components'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    render(){
        return(
            <div>
                <Header />
                <div class='bodyHome' >
                    <h1>Test Page</h1>
                    <ul>
                        <li><Link to='/' >Home</Link></li>
                        <li><Link to='/test' >Test</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}