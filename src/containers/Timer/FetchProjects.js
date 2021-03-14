import React, {Component} from 'react';
import axios from '../../../axios-data';


class ProjectList extends Component {

    state = {
        projects: []
    }

    componentDidMount () {
        axios.get('https://togglttrack-default-rtdb.firebaseio.com/clients.json')
        .then(res => {this.setState({projects: res.data})})
    }

    render(){

        const list = []
        for(var i in this.state.projects){
            list.push(this.state.projects[i].project);
        }
       
        return(
            {list}
        );
    }
}


export default ProjectList;

