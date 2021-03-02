import React, {Component} from 'react';

import Header from '../../components/header/header';
import Button from '../../components/UI/Button/Button';
//import Modal from '../../components/Modal/Modal';

class Project extends Component {

    state = {
        clicked: false
    }

    createNewProject = () => {
        this.state.clicked = true;
    };

    render() {
        return (
            <div>
                <Header>
                <h3>Projects</h3>
                    <Button onClick= {this.createNewProject}> + New Project</Button>
                </Header>
            </div>
        );
    }
};

export default Project;