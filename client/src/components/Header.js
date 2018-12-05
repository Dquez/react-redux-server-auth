import React, {Component} from 'react';
import {Link} from 'react-router-dom';
export default class Header extends Component{

    render(){
        return (
            <div>
                <Link to='/'>Redux Auth</Link>
                <Link to='/singup'>Sign up</Link>
                <Link to='/signin'>Sign in</Link>
                <Link to='/signout'>Sign in</Link>
                <Link to='/feature'>Sign in</Link>
            </div>
        )
    }
}