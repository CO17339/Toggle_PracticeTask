import React, {Component} from 'react';
import axios from '../../axios-data';
import ClientName from './ClientName';

class DisplayClient extends Component {

    state = {
        clients: []
    }

    componentDidMount () {
        axios.get('https://togglttrack-default-rtdb.firebaseio.com/clients.json')
        .then(res => {this.setState({clients: res.data})});
    }

    render(){
       
        return(
            <div>
                
            </div>
        );
    }
}


export default DisplayClient;