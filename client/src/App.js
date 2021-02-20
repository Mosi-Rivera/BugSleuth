import {Switch,Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import GuardedRoute from './components/guarded_route/guarded_route';
import LandingPage from './pages/landing/landing';
import HomePage from './pages/home/home';
import ProjectPage from './pages/project/project';
import CreateProjectPage from './pages/CreateProjectPage/CreateProjectPage';
import CreateTicketPage  from './pages/CreateTicketPage/CreateTicketPage';
import TicketPage from './pages/TicketPage/TicketPage';

function App() {
  const auth = useSelector(state => state.auth.authenticated);
  console.log(auth);
  return (
    <Switch>
      <GuardedRoute path='/home'                          component={ HomePage }          auth={auth} />
      <GuardedRoute path='/new_project'                   component={ CreateProjectPage } auth={auth} />
      <GuardedRoute path='/ticket/:ticket_id'             component={ TicketPage }        auth={auth} />
      <GuardedRoute path='/new_ticket'                    component={ CreateTicketPage }  auth={auth} />
      <GuardedRoute path='/project/:project_id'           component={ ProjectPage }       auth={auth} />
      <Route path='/' default>
          <LandingPage/>
      </Route>
    </Switch>
  );
}

export default App;
