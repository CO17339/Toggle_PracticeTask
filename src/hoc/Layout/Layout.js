import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import Menu from '../../containers/Menu/Menu';
import Projects from '../../containers/Projects/Projects';
import Clients from '../../containers/Clients/Clients';
import Timer from '../../containers/Timer/Timer';
import '../../styling/layout.scss';

const layout = props => {

    return(
        <div>
            <aside> <Menu /> </aside>
            <main>
                <Switch>
                    <Route path="/client" component = {Clients}/>
                    <Route path="/timer" component = {Timer}/>
                    <Route path="/" exact component = {Projects}/>
                    <Redirect to = "/"/>
                </Switch>
            </main>  
        </div>
    );
}

export default layout;