import React, {Component} from 'react';
import axios from '../../../axios-data';
import ClientName from './ClientName';
import '../../../styling/ui.scss';
import UpdateClients from '../UpdateClients';
import SearchClient from '../SearchClient';


class DisplayClient extends Component {

    state = {
        clients: [],
        clientStatus: false
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

        let show = null;

        if(this.state.clientStatus===true){
            show = <UpdateClients/>
        }

        const list = []
        for(var i in this.state.clients){
            list.push(this.state.clients[i]);
            console.log(this.state.clients[i])
        }
        const clients_list = list.map(display => {
            return (
                <ClientName key = {display.id} 
                    name = {display.value}
                    updateClientHandler={this.updateClientHandler}>
                        {show}
                </ClientName>
            );
        });
       
        return(
            <div className="dis_cli">
                {clients_list}
            </div>
        );
    }
}


export default DisplayClient;