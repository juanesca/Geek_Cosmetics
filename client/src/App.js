import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Load from './Pages/Load';
import Dashboard from './Pages/Dashboard';
import Opt from './Pages/Options';

import { toast } from 'react-toastify';

toast.configure();

function App() {
  return (
    <div className="mb-0">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Load} />
          <Route exact path='/opt' component={Opt} />
          <Route exact path='/dashboard' component={Dashboard} /> 
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
