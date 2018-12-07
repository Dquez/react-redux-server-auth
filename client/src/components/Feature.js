import React, {Component} from 'react';
import requireAuth from './requireAuth';

class Feature extends Component {
    render(){
        return(
            <div> I'm a secret feature</div>
        )
    }
}

export default requireAuth(Feature);