import {Switch,Route} from 'react-router-dom';
import GuardedRoute from './components/guarded_route/guarded_route';
import LandingPage from './pages/landing/landing';
import HomePage from './pages/home/home';
import ProjectPage from './pages/project/project';
import CreateProjectPage from './pages/CreateProjectPage/CreateProjectPage';
import CreateTicketPage  from './pages/CreateTicketPage/CreateTicketPage';
import TicketPage from './pages/TicketPage/TicketPage';
import {useState} from 'react';

function App() {
  const [authenticated,set_authenticated] = useState(false);
  const [user,set_user]                   = useState(null);
  const handle_authenticate = user_data => {
    set_authenticated(true);
    set_user(user_data);
  }
  const logout = () => set_authenticated(false);
  const props = {
    logout,
    user,
    auth: authenticated
  }
  return (
    <Switch>
      <GuardedRoute {...props} path='/home'                   component={ HomePage }          />
      <GuardedRoute {...props} path='/new_project'            component={ CreateProjectPage } />
      <GuardedRoute {...props} path='/ticket/:ticket_id'      component={ TicketPage }        />
      <GuardedRoute {...props} path='/new_ticket/:project_id' component={ CreateTicketPage }  />
      <GuardedRoute {...props} path='/project/:project_id'    component={ ProjectPage }       />
      <Route path='/' default>
          <LandingPage authenticate={handle_authenticate}/>
      </Route>
    </Switch>
  );
}

export default App;
