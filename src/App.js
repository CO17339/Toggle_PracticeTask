import './App.scss';
import Layout from './hoc/Layout/Layout';
import {BrowserRouter} from 'react-router-dom';
import Projects from './containers/Projects/Projects';
import Clients from './containers/Clients/Clients';
import Timer from './containers/Timer/Timer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
