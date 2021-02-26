import React from 'react';

import Header from '../../components/header/header';
import Button from '../../components/Button/Button';

const project = props => {

    const createNewProject = () => {

    };

    return (
        <div>
            <Header>
               <h3>Projects</h3>
                <Button onClick= {createNewProject}> + New Project</Button>
            </Header>
        </div>
    );
};

export default project;