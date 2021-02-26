import React, {Component} from 'react';

import Header from '../../components/header/header';
import Button from '../../components/Button/Button';

class Client extends Component {

    state = {
        beingAdded: false
    }

    addNewClienthandler = props => {

    };

    render() {
        return (
            <div>
                <Header>
                    <h3>Clients</h3>
                    <Button onClick= {this.addNewClient}> + New Client</Button>
                </Header>
            </div>
        );
    }
    
};

export default Client;