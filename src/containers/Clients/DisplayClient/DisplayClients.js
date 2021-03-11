import React, {Component} from 'react';
import axios from '../../../axios-data';
import ClientName from './ClientName';
import '../../../styling/ui.scss';
import SearchClient from '../SearchClient';


class DisplayClient extends Component {

    state = {
        clients: [],
        clientStatus: false,
        inputValue: ''
    }

    componentDidMount () {
        axios.get('https://togglttrack-default-rtdb.firebaseio.com/clients.json')
        .then(res => {this.setState({clients: res.data})})
        .then(res => (console.log(this.state.clients)));
    }

    updateClientHandler = () => {
        this.setState({clientStatus: true})
    }

    render(){

        const list = []
        for(var i in this.state.clients){
            list.push(this.state.clients[i]);
            console.log(this.state.clients[i])
        }
       
        return(
            {list}
        );
    }
}


export default DisplayClient;